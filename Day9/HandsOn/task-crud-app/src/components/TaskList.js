import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="task-container">
      <h2>Task List</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {tasks.map((task, index) => (
      <tr key={task.id}>
        <td>{index + 1}</td> {/* Display Number Instead of UUID */}
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td>{task.date}</td>
        <td>{task.createdBy}</td>
        <td>
          <div className="btn-container">
          <Link to={`/edit/${task.id}`} className="btn edit">✏️Edit</Link>
          <Link to={`/delete/${task.id}`} className="btn delete">🗑️Delete</Link>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
    </table>
    </div>
  );
};

export default TaskList;
