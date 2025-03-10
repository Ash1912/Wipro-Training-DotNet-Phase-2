import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask } from "../redux/taskSlice";

const DeleteTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigate("/");
  };

  return (
    <div className="delete-container">
      <h2>Are you sure you want to delete this task?</h2>
      <button onClick={handleDelete} className="btn delete">Yes, Delete</button>
      <button onClick={() => navigate("/")} className="btn cancel">Cancel</button>
    </div>
  );
};

export default DeleteTask;
