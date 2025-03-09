import React, { useEffect, useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [activeClass, setActiveClass] = useState("all");

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todosList")) || [];
        setTodos(storedTodos);
    }, [newTodo]);

    const handleAdd = () => {
        const todoObject = {
            newTodo: newTodo.charAt(0).toUpperCase() + newTodo.slice(1),
            isCompleted: false,
        };

        const updatedTodos = [...todos, todoObject];

        setTodos(updatedTodos);

        localStorage.setItem("todosList", JSON.stringify(updatedTodos));

        setNewTodo("");

        console.log(updatedTodos);
    };

    const handleDelete = (index) => {
        const storedTodos = JSON.parse(localStorage.getItem("todosList"));
        const updatedTodos = storedTodos.filter((_, i) => index !== i);
        localStorage.setItem("todosList", JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
    };

    const handleCheckboxChange = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );

        localStorage.setItem("todosList", JSON.stringify(updatedTodos));

        setTodos(updatedTodos);
    };

    const allTodos = () => {
        setTodos(JSON.parse(localStorage.getItem("todosList")) || []);
        setActiveClass("all");
    };

    const activeTodos = () => {
        const storedTodos = JSON.parse(localStorage.getItem("todosList")) || [];
        const actives = storedTodos.filter((todo) => !todo.isCompleted);

        setActiveClass("active");
        setTodos(actives);

        console.log(actives);
    };

    const completedTodos = () => {
        const storedTodos = JSON.parse(localStorage.getItem("todosList")) || [];
        const completed = storedTodos.filter((todo) => todo.isCompleted);
        setTodos(completed);
        setActiveClass("completed");
        console.log(completed);
    };

    const clearCompleted = () => {
        const storedTodos = JSON.parse(localStorage.getItem("todosList")) || [];
        const actives = storedTodos.filter((todo) => !todo.isCompleted);

        localStorage.setItem("todosList", JSON.stringify(actives));

        setTodos(actives);
    };

    return (
        <div className="todo-list">
            <div className="input-group">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="input"
                    placeholder="Create a new todo..."
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <div className="todo-container">
                {todos.map((todo, i) => (
                    <div className="todo" key={i}>
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.isCompleted}
                                onChange={() => handleCheckboxChange(todo.id)}
                                id={i}
                            />
                            <label htmlFor={i}>{todo.newTodo}</label>
                        </div>
                        <p
                            className="remove-todo"
                            onClick={() => handleDelete(i)}
                        >
                            x
                        </p>
                    </div>
                ))}
            </div>
            <div className="footer">
                <p>{todos.length} items left</p>
                <div className="details">
                    <p
                        className={activeClass === "all" ? "active" : ""}
                        onClick={allTodos}
                    >
                        All
                    </p>
                    <p
                        className={activeClass === "active" ? "active" : ""}
                        onClick={activeTodos}
                    >
                        Active
                    </p>
                    <p
                        className={activeClass === "completed" ? "active" : ""}
                        onClick={completedTodos}
                    >
                        Completed
                    </p>
                </div>
                <p className="clear-all" onClick={clearCompleted}>Clear Completed</p>
            </div>
        </div>
    );
};

export default TodoList;
