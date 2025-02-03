import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./slices/counterSlice";
import { addTodo , editTodo, deleteTodo} from "./slices/todosSlice";

const App = () => {
  const count = useSelector((state) => state.counter.value); // Получаем данные из хранилища
  const todos = useSelector((state) => state.todos.value); // Получаем данные из хранилища
  const dispatch = useDispatch(); // Для отправки экшенов

  return (
    <div>
      <h1>Счётчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>


      <button onClick={() => dispatch(addTodo({
        text: "Сделать что-то",
      }))}>add todo</button>
      

      {todos.map((todo) => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={()=>{
              dispatch(editTodo({id: todo.id}));  
          }}/>
          <h3>{todo.text}</h3>
          <p>{todo.completed ? "Выполнено" : "Не выполнено"}</p>
          <button onClick={()=>{
             dispatch(deleteTodo({id: todo.id}));  
          }}>Delete Todo</button>
        </div>
      ))}

    </div>
  );
};

export default App;
