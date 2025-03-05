import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // ✅ Import routing components
import Register from "./components/Register";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import { TaskProvider } from "./context/TaskContext";
import { ToastContainer } from "react-toastify";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate(); // ✅ Initialize navigate

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/"); // ✅ Redirect to login/register on logout
    };

    return (
        <>
            <ToastContainer />
            <TaskProvider>
                <Navbar token={token} onLogout={handleLogout} />
                <div className="container">
                    {/* <h1>Task Manager App</h1> */}
                    <Routes>
                        {!token ? (
                            <>
                                <Route path="/" element={<Register />} />
                                <Route path="/login" element={<Login setToken={setToken} />} />
                            </>
                        ) : (
                            <Route path="/dashboard" element={<TaskList token={token} />} />
                        )}
                    </Routes>
                </div>
            </TaskProvider>
        </>
    );
};

export default App;
