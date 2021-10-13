import React, { useState, useEffect } from "react";

function Todoey() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const saveData = (newTodos) => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    useEffect(() => {
        if (localStorage.getItem("todos")) {
            setTodos(JSON.parse(localStorage.getItem("todos")));
        }
    }, []);

    const onAddTodo = () => {
        if (newTodo.trim()) {
            let newTodos = [...todos, { todo: newTodo.trim(), id: Date.now() }];
            setTodos(newTodos);
            setNewTodo("");
            saveData(newTodos);
        }
    };

    const something=(event)=> {
        if (event.keyCode === 13) {
            onAddTodo()
        }
    }
    const deleteTodo = (id) => {
        let newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        saveData(newTodos);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Todoey</h2>
            <table className="table table mt-5">
                <thead>
                <tr>
                    <th>
                        <input
                            type="text"
                            id="todoInput"
                            className="form-control"
                            placeholder="Add todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            onKeyDown={(e) => something(e)}
                        />
                    </th>
                    <th>
                        <button className="btn btn-primary btn-block" onClick={onAddTodo}>
                            Add
                        </button>
                    </th>
                </tr>
                </thead>

                <tbody id="table">
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.todo}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Todoey;
