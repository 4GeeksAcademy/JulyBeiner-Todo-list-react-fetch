import React from "react";

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <li className="todo-list-item">
      <span className="todo-item-text">{todo.label}</span>

      <button
        className="todo-delete-button"
        type="button"
        aria-label={`Eliminar tarea ${todo.label}`}
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;