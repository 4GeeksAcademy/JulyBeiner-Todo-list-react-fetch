import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const USERNAME = "julybeiner2026v2"
const API_URL = "https://playground.4geeks.com/todo";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${USERNAME}`, {
        method: "POST",
      });

      if(!response.ok && response.status !== 400) {
        throw new Error("unable to create username.");
      }
    } catch(error) {
      console.log(error);
      setErrorMessage("There was an issue creating the username.");
    }
  };

  const getTodos = async () => {
    try{
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/users/${USERNAME}`);

      if(response.status === 404) {
        await createUser();
        setTodos([]);
        return;
      }

      if(!response.ok) {
        throw new Error("Unable to load tasks.")
      }

      const data = await response.json();

      setTodos(data.todos || []);
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an issue while trying to load the tasks.")
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      label: inputValue.trim(),
      is_done: false,
    };

    try {
      setErrorMessage("");

      const response = await fetch(`${API_URL}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
    });

    if(!response.ok) {
      throw new Error("unable to add task.");
    }
     setInputValue("");
     await getTodos();
  } catch(error) {
    console.log(error);
    setErrorMessage("There was a problem trying to add the task.")
  }
  };


  const deleteTodo = async (todoId) => {
  try {
    setErrorMessage("");

    const response = await fetch(`${API_URL}/todos/${todoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Unable to delete task.");
    }

    await getTodos();
  } catch (error) {
    console.log(error);
    setErrorMessage("There was an issue while deleting task.");
  }
};

const clearTodos = async () => {
  try {
    setErrorMessage("");

    const deletePromises = todos.map((todo) =>
      fetch(`${API_URL}/todos/${todo.id}`, {
          method: "DELETE",
        })
      );

  await Promise.all(deletePromises);

  await getTodos();
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an issue while clearing the List");
    }
  };

  useEffect(() =>{
    const startApp = async () => {
      await getTodos();
    };

    startApp();
  }, []);

  return (
    <main className="todo-page">
      <section className="todo-card">
        <h1 className="todo-title">Todo List using Fetch</h1>

        <TodoInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTodo={addTodo}
        />

        {isLoading && <p className="todo-message">Loading tasks...</p>}

        {errorMessage && <p className="todo-error">{errorMessage}</p>}

        <TodoList  todos={todos} deleteTodo={deleteTodo} />

        {todos.length > 0 && (
          <button 
            className="todo-clear-button"
            type="button"
            onClick={clearTodos}
          > 
            Clear all Tasks
          </button>
        )}

        <p className="todo-counter">
          {todos.length === 0
          ? "No pending tasks."
          : `${todos.length} tarea${todos.length === 1 ? "" : "s"} pendiente${
                todos.length === 1 ? "" : "s"
              }.`}
        </p>
      </section>
    </main>
  );
};

export default Home;