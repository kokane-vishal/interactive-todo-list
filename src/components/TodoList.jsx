import React from 'react';
import TodoItem from './TodoItem.jsx';

function TodoList({ todos, toggleComplete, deleteTodo, editTodo, updatePriority }) {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    updatePriority={updatePriority}
                />
            ))}
        </ul>
    );
}

export default TodoList;
