import React, { useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { deleteTask } from "../services/api";
import AddTask from "./AddTask";

const TaskList = ({ token }) => {
    const { tasks, fetchTasks } = useContext(TaskContext);

    useEffect(() => {
        fetchTasks(token);
    }, [fetchTasks, token]);

    const handleDelete = async (id) => {
        try {
            await deleteTask(token, id);
            fetchTasks(token);
        } catch (error) {
            alert("Failed to delete task");
        }
    };

    return (
        <div className="task-container">
            <AddTask token={token} />
            <ul className="task-list">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task._id}>
                            {task.title}
                            <button onClick={() => handleDelete(task._id)}>❌</button>
                        </li>
                    ))
                ) : (
                    <p style={{ textAlign: "center", fontSize: "16px", color: "#888" }}>No tasks available.</p>
                )}
            </ul>
        </div>
    );
};

export default TaskList;
