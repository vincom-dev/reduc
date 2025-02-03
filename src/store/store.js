import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice"; // Импортируем редьюсер
import todosReducer from "../slices/todosSlice"; // Импортируем редьюсер

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});

export default store;
