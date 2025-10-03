import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/todo";

// Load từ server
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const res = await axios.get(API_URL);
  // Nếu BE trả về { message, todos }
  return res.data;
});

export const addTodoServer = createAsyncThunk(
  "todo/addTodoServer",
  async (text) => {
    const res = await axios.post(API_URL, { text });
    return res.data; // { message, todo, status }
  }
);

export const toggleTodoServer = createAsyncThunk(
  "todo/toggleTodoServer",
  async (id) => {
    const res = await axios.patch(`${API_URL}/${id}/toggle`);
    return res.data; // { message, todo, status }
  }
);

export const deleteTodoServer = createAsyncThunk(
  "todo/deleteTodoServer",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const updateTodoServer = createAsyncThunk(
  "todo/updateTodoServer",
  async ({ id, updates }) => {
    const res = await axios.patch(`${API_URL}/${id}`, updates);
    return res.data; // { message, todo, status }
  }
);

export const markAllCompleteServer = createAsyncThunk(
  "todo/markAllCompleteServer",
  async () => {
    const res = await axios.patch(`${API_URL}/mark-all`);
    return res.data; // { message, todos, status }
  }
);

// ✅ New: clear completed todos (BE bulk)
export const clearCompletedServer = createAsyncThunk(
  "todo/clearCompletedServer",
  async () => {
    const res = await axios.delete(`${API_URL}/completed`);
    return res.data; // { message, todos, status }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [],
    filter: "all",
    isAddingTodo: false,
  },
  reducers: {
    setIsAddingTodo: (state, action) => {
      state.isAddingTodo = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload; // luôn là array
      })
      .addCase(addTodoServer.fulfilled, (state, action) => {
        state.items.unshift(action.payload.todo);
        state.isAddingTodo = false;
      })
      .addCase(toggleTodoServer.fulfilled, (state, action) => {
        const updated = action.payload.todo;
        const idx = state.items.findIndex((t) => t.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(deleteTodoServer.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTodoServer.fulfilled, (state, action) => {
        const updated = action.payload.todo;
        const idx = state.items.findIndex((t) => t.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      })
      // ✅ Bulk API handle
      .addCase(markAllCompleteServer.fulfilled, (state, action) => {
        state.items = action.payload.todos;
      })
      .addCase(clearCompletedServer.fulfilled, (state, action) => {
        state.items = action.payload.todos;
      });
  },
});

export const { setIsAddingTodo, setFilter } = todoSlice.actions;

export default todoSlice.reducer;
