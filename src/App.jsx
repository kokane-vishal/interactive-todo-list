import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setCompletedCount(todos.filter(todo => todo.completed).length);
  }, [todos]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toLocaleString(),
        priority: 'medium'
      };
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const updatePriority = (id, priority) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filterTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <div className="todo-app">
        <header>
          <h1>Interactive Todo List</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>

        <TodoForm addTodo={addTodo} />

        <div className="todo-stats">
          <p>Total tasks: {todos.length}</p>
          <p>Completed: {completedCount}</p>
          <p>Remaining: {todos.length - completedCount}</p>
        </div>

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          {completedCount > 0 && (
            <button className="clear-completed" onClick={clearCompleted}>
              Clear Completed
            </button>
          )}
        </div>

        <TodoList
          todos={filterTodos()}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          updatePriority={updatePriority}
        />

        {todos.length === 0 && (
          <div className="empty-state">
            <p>Your list is empty! Add some tasks to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;