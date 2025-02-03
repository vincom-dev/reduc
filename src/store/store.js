import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counterSlice"; // Импортируем редьюсер
import todosReducer from "../todosSlice"; // Импортируем редьюсер

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});

export default store;
