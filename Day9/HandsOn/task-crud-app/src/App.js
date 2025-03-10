import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./redux/taskSlice";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import DeleteTask from "./components/DeleteTask";
import "./styles.css";

const store = configureStore({ reducer: { tasks: taskReducer } });

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/add" className="nav-link">Add Task</Link>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/edit/:id" element={<EditTask />} />
              <Route path="/delete/:id" element={<DeleteTask />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;