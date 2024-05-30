import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return storedTodos;
  });
  const [newTodo, setNewTodo] = useState('');
  const [todoCount, setTodoCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodoCount(todos.length);
    filterTodos();
  }, [todos]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = { text: newTodo.trim(), completed: false };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleThemeToggle = () => {
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    filterTodos();
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filterTodos = () => {
    switch (filter) {
      case 'active':
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div>
      <section className="create-todo">
        <div className="create-todo-content">
          <h2 className="visually-hidden">Create new todo here</h2>
          <div className="create-container container">
            <div className="logo-theme">
              <img
                className="logo-img"
                src="image/logo.svg"
                alt="Logo"
                width="167"
                height="40"
              />
              <button
                className="logo-toggler theme-toggler"
                id="themeToggler"
                onClick={handleThemeToggle}
              >
                <span className="theme-content"></span>
              </button>
            </div>

            <form className="form-create" onSubmit={handleAddTodo}>
              <input
                className="create-todo-input"
                id="form-input"
                type="text"
                name="newTodo"
                placeholder="Create a new todo..."
                minLength="3"
                maxLength="25"
                spellCheck="false"
                autoComplete="off"
                autoFocus
                required
                value={newTodo}
                onChange={handleInputChange}
              />

            </form>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="todos todo-wrapper" id="list-group-todo">
          {filteredTodos.map((todo, index) => (
            <div
              key={index}
              className={`list-item ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todo-text-checkbox" htmlFor={`todo-${index}`}>
                <input
                  className="checkbox"
                  type="checkbox"
                  name={`todo-${index}`}
                  id={`todo-${index}`}
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(index)}
                />
                <p>{todo.text}</p>
              </label>
            </div>
          ))}
        </div>
        <div className="filter">
          <div className="todo-count">{todoCount} items left</div>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === 'all'}
                onChange={handleFilterChange}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                value="active"
                checked={filter === 'active'}
                onChange={handleFilterChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                value="completed"
                checked={filter === 'completed'}
                onChange={handleFilterChange}
              />
              Completed
            </label>
          </div>
          <div className="clear-completed" onClick={handleClearCompleted}>
            Clear Completed
          </div>
        </div>
      </section>
    </div>
  );
};

export default TodoApp;