import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../redux/taskSlice";

const AddTask = () => {
  const [task, setTask] = useState({ name: "", description: "", date: "", createdBy: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Task Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="text" name="createdBy" placeholder="Created By" onChange={handleChange} required />
        <button type="submit" className="btn add">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
