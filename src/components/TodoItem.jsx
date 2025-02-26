import React, { useState, useRef, useEffect } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo, updatePriority }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [showActions, setShowActions] = useState(false);
    const editInputRef = useRef(null);

    useEffect(() => {
        if (isEditing && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [isEditing]);

    const handleEdit = () => {
        if (editText.trim()) {
            editTodo(todo.id, editText);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    return (
        <li
            className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="todo-content">
                {!isEditing ? (
                    <>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                id={`todo-${todo.id}`}
                            />
                            <label htmlFor={`todo-${todo.id}`} className="checkbox-custom"></label>
                        </div>

                        <span
                            className="todo-text"
                            onClick={() => !todo.completed && setIsEditing(true)}
                        >
                            {todo.text}
                        </span>

                        <div className={`todo-actions ${showActions ? 'visible' : ''}`}>
                            <select
                                value={todo.priority}
                                onChange={(e) => updatePriority(todo.id, e.target.value)}
                                className={`priority-selector priority-${todo.priority}`}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                            <button onClick={() => setIsEditing(true)} disabled={todo.completed}>
                                ✏️
                            </button>

                            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                                🗑️
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="edit-mode">
                        <input
                            type="text"
                            ref={editInputRef}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleEdit}
                            onKeyDown={handleKeyDown}
                            className="edit-input"
                        />
                        <div className="edit-actions">
                            <button onClick={handleEdit}>Save</button>
                            <button onClick={() => {
                                setIsEditing(false);
                                setEditText(todo.text);
                            }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="todo-meta">
                <span className="creation-date">{todo.createdAt}</span>
            </div>
        </li>
    );
}

export default TodoItem;