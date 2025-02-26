import React, { useState } from 'react';

function TodoForm({ addTodo }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(input);
        setInput('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task..."
                className="todo-input"
            />
            <button type="submit" className="add-button">Add Task</button>
        </form>
    );
}

export default TodoForm;