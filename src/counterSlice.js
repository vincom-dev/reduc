import { createSlice } from "@reduxjs/toolkit";

// Начальное состояние
const initialState = {
  value: 0,
};

// Создаём slice
const counterSlice = createSlice({
  name: "counter", // Уникальное имя slice
  initialState,    // Начальное состояние
  reducers: {      // Экшены + редьюсеры
    increment: (state) => {
      state.value += 1; // Можно изменять state напрямую (Immer делает его иммутабельным)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // Добавляем переданное число
    },
  },
});

// Экспортируем экшены
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Экспортируем редьюсер (нужен для store)
export default counterSlice.reducer;
