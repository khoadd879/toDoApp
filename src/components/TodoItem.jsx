import React, { useState } from "react";
import { Calendar, Check, Edit3, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  deleteTodoServer,
  toggleTodoServer,
  updateTodoServer,
} from "../store/todoSlice";
import TodoForm from "./TodoForm";

function TodoItem({ todo, index }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTodoServer(todo.id));
  };

  const handleUpdate = (text) => {
    dispatch(updateTodoServer({ id: todo.id, updates: { text: text.trim() } }));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-100">
        <TodoForm
          initialValue={todo.text}
          OnSubmit={handleUpdate}
          onClick={() => setIsEditing(false)}
          placeholder="Update your todo"
        />
      </div>
    );
  }

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteTodoServer(todo.id), 200);
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";
    return new Intl.DateTimeFormat("en-Us", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div
      className={`group p-4 hover:bg-gray-100 transitio-all duration-200 ${
        isDeleting
          ? "opacity-0 transforms scale-95"
          : "opacity-100 transform scale-100"
      } ${todo.completed ? "opacity-75" : ""}`}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: "slideInUp 0.3s ease-out forwards",
      }}
    >
      {/* Toggle Button*/}
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
              : "border-gray-400 hover:border-green-500 hover:bg-green-50"
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className={`text-gray-800 leading-relaxed`}>{todo.text}</div>
          <div className="flex items-center gap-4 mt-2 text-xl text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Created {formatDate(todo.createdAt)}</span>
            </div>
            <span>Update {formatDate(todo.updatedAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-all duration-200"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 size={16} />
          </button>

          <button
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-lg transition-all duration-200"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
