import { createSlice } from "@reduxjs/toolkit";

// Начальное состояние
const initialState = {
  value: [],
};

// Создаём slice
const todoSlice = createSlice({
  name: "todoAction", 
  initialState,   
  reducers: {  
    addTodo: (state, action) => {
        state.value.push({id: Date.now(), text: action.payload.text, completed: false});
    },
    editTodo: (state, action) => {
        const todo = state.value.find((todo) => todo.id === action.payload.id);
        todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
        const todo = state.value.find((todo) => todo.id === action.payload.id);
        state.value.splice(state.value.indexOf(todo), 1);
    },
  },
});

// Экспортируем экшены
export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;

// Экспортируем редьюсер (нужен для store)
export default todoSlice.reducer;
