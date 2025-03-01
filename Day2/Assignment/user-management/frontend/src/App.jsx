import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import "./styles.css";

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/users").then(res => setUsers(res.data));
    }, []);

    const addUser = (user) => {
        axios.post("http://localhost:5000/users", user).then(res => {
            setUsers([...users, res.data]);
        });
    };

    const updateUser = (updatedUser) => {
        axios.put(`http://localhost:5000/users/${updatedUser.id}`, updatedUser).then(() => {
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setEditingUser(null);
        });
    };

    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/users/${id}`).then(() => {
            setUsers(users.filter(user => user.id !== id));
        });
    };

    return (
        <div className="container">
            <h1>User Management System</h1>
            <UserForm addUser={addUser} updateUser={updateUser} editingUser={editingUser} />
            <UserTable users={users} setEditingUser={setEditingUser} deleteUser={deleteUser} />
        </div>
    );
};

export default App;
