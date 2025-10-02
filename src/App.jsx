import React from "react";
import TodoApp from "./components/TodoApp";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <TodoApp />
      </Provider>
    </div>
  );
}

export default App;
