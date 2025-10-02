import React, { useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTodo, setIsAddingTodo } from "../store/todoSlice";

function TodoForm({
  OnSubmit,
  OnCancel,
  initialValue = "",
  placeholder = "Add a new Todo",
}) {
  const dispatch = useDispatch(initialValue);
  const [text, setText] = useState(initialValue);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (trimmedText) {
      if (OnSubmit) {
        OnSubmit(trimmedText);
      } else {
        dispatch(addTodo(trimmedText));
      }
      setText("");
    }
  };

  const handleCancel = () => {
    if (OnCancel) {
      oncancel();
    } else {
      dispatch(setIsAddingTodo(false));
    }
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <div className="flex-1">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholde={placeholder}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-600 "
          maxLength={500}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          title="Save todo"
        >
          <Check size={18} />
        </button>
        <button
          onClick={handleCancel}
          type="submit"
          className="flex items-center justify-center w-10 h-10 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          title="Save todo"
        >
          <X size={18} />
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
