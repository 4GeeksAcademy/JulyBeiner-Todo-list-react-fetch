import React from "react";

const TodoInput = ({inputValue, setInputValue, addTodo}) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        addTodo();
    };
    
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                className="todo-input"
                type="text"
                placeholder="Write a new task..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
        </form>
    );
};

export default TodoInput;
