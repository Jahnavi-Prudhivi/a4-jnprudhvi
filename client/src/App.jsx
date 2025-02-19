import { useEffect, useState } from "react";
import { fetchTasks, addTask, deleteTask, logoutUser } from "./api";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: "", deadline: "", priority: "", notes: "" });

    useEffect(() => {
        fetchTasks().then(res => setTasks(res.data)).catch(err => console.log(err));
    }, []);

    const handleAddTask = () => {
        addTask(newTask).then(res => setTasks(res.data));
    };

    const handleDeleteTask = (id) => {
        deleteTask(id).then(res => setTasks(res.data));
    };

    return (
        <div>
            <button onClick={logoutUser}>Logout</button>
            <input placeholder="Task Name" onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
            <button onClick={handleAddTask}>Add Task</button>
            {tasks.map(task => <p key={task._id}>{task.name} <button onClick={() => handleDeleteTask(task._id)}>Delete</button></p>)}
        </div>
    );
}

export default App;
