import React, { useEffect, useState } from "react";



//create your first component
const Home = () => {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState ();

    const createUser = async () => {
        await fetch("https://playground.4geeks.com/todo/users/manueljcm04",
           { method: "POST" }
        ).then(resp => {
            if (resp.ok) {
                alert("se ha creado el usuario correctamente")
                getUser();
            }
        })
    }

    const getUser = async () => {
        await fetch("https://playground.4geeks.com/todo/users/manueljcm04").then(resp => {
            if (!resp.ok) {
                createUser();
            }
            return resp.json()
        }).then(user => setUser(user))
    };

    useEffect(() => {
        getUser();
	}, [])
        
    

    const createTask = async (task) => {
        await fetch("https://playground.4geeks.com/todo/todos/manueljcm04", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "label": task,
                "is_done": false
            })
        }).then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        }).then(respJson => {
            const userTaks = user.todos;
            const newUser = {
                ...user,
                todos: [...userTaks, respJson]
            };
            setUser(newUser);
        })
    }

    const validateTask = (task) => {
        if (!task || !task.trim()) {
            alert("el valor de la tarea no puede ser vacio")
        }
        createTask(task)
        setTask("");
    }
    const deleteTask = async (task) => {
        const id = task.id;
        await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        }).then(resp => {
            if (resp.ok) {
                const userTaks = user.todos.filter(item.id !== task.id)
                const newUser = {
                    ...user,
                    todos: [...userTaks]
                }
            }
        })

    }

    console.log(user);


return (
    <div className="container">
        <h1 className="text-center mt-5">Todo List Local</h1>
        <div className="todolist">
            <input placeholder="add task"
                onChange={(Event) => setTask(Event.target.value)}
                onKeyDown={(Event) => Event.key === "Enter" && validateTask(task)}
                type="text"
                value={task} />
            {
                user && user.todos.map((item) =>
                    <li key={item.id}>
                        {item.label}
                        <span onClick={() => deleteTask(item)}> <i class="fa-solid fa-x"></i></span>
                    </li>)
            }
        </div>
        <p className="text-center">
            {user && user.todos.length ?
                <span>Tienes {user && user.todos.length} tareas pendientes</span> : <span> No hay tareas pendientes</span>}
        </p>
        <button onClick={() => deleteUser()}>
            Delete User
        </button>
    </div>
);
}

export default Home;
