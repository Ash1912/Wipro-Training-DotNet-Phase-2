import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editTask } from "../redux/taskSlice";

const EditTask = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t.id === id);
  const [updatedTask, setUpdatedTask] = useState(task || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({ id, updatedTask }));
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={updatedTask.name} onChange={handleChange} required />
        <textarea name="description" value={updatedTask.description} onChange={handleChange} required />
        <input type="date" name="date" value={updatedTask.date} onChange={handleChange} required />
        <input type="text" name="createdBy" value={updatedTask.createdBy} onChange={handleChange} required />
        <button type="submit" className="btn edit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
