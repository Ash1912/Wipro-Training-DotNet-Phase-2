import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { addTask } from "../services/api";

const AddTask = ({ token }) => {
    const [title, setTitle] = useState("");
    const { fetchTasks } = useContext(TaskContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Task title cannot be empty");

        try {
            await addTask(token, title);
            fetchTasks(token);
            setTitle("");
        } catch (error) {
            alert("Failed to add task");
        }
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter a new task..." 
                required 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
