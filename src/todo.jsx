import React, { useState } from 'react';
import './todo.css'; 

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [longPressIndex, setLongPressIndex] = useState(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (text.trim() === '') {
      return;
    }

    const newTodo = {
      timeStamp: new Date().toISOString(),
      text: text
    };

    setTodos([...todos, newTodo]);
    setText('');
  };

  const handleTodoMouseDown = (index) => {
    const timer = setTimeout(() => {
      handleTodoLongPress(index);
    }, 500); // Adjust the duration for a long press

    setLongPressTimer(timer);
    setLongPressIndex(index);
  };

  const handleTodoMouseUp = () => {
    clearTimeout(longPressTimer);
    setLongPressTimer(null);
    setLongPressIndex(null);
  };

  const handleTodoLongPress = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });

    setLongPressTimer(null);
    setLongPressIndex(null);
  };

  return (
    <div className="container"> {/* Add container class */}
      <h1>To-Do List</h1>
      <ul className="todo-list"> {/* Add todo-list class */}
        {todos.map((todo, index) => (
          <li
            key={index}
            onMouseDown={() => handleTodoMouseDown(index)}
            onMouseUp={handleTodoMouseUp}
            onTouchStart={() => handleTodoMouseDown(index)}
            onTouchEnd={handleTodoMouseUp}
            className={`todo-item ${index === longPressIndex ? 'long-press' : ''}`} 
          >
            <input type="checkbox" />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={text} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TodoList;
