import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../ToastNotifications";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/api/auth/register", { name, email, password });
            showToast("Registration successful!", "success");
            navigate("/login");
        } catch (error) {
            showToast("Registration failed", "error");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Sign Up</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
};

export default Register;
