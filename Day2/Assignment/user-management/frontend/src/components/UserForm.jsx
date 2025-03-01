import React, { useState, useEffect } from "react";

const UserForm = ({ addUser, updateUser, editingUser }) => {
    const [formData, setFormData] = useState({ name: "", email: "", age: "", location: "" });

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            updateUser(formData);
        } else {
            addUser(formData);
        }
        setFormData({ name: "", email: "", age: "", location: "" });
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
        </form>
    );
};

export default UserForm;
