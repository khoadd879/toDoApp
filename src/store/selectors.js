export const selectTodos = (state) => state.todo.items;
export const SelectFilter = (state) => state.todo.filter;
export const selectIsAddingTodo = (state) => state.todo.isAddingTodo;

export const selectFilteredTodos = (state) => {
  const todo = state.todo.items;
  const filter = state.todo.filter;

  switch (filter) {
    case "active":
      return todo.filter((todo) => !todo.completed);
    case "completed":
      return todo.filter((todo) => todo.completed);
    default:
      return todo;
  }
};

export const selectTodosStats = (state) => {
  const todo = state.todo.items;
  const total = todo.length;
  const completed = todo.filter((todo) => todo.completed).length;
  const active = total - completed;
  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;
  return { todo, total, completed, active, completionPercentage };
};
