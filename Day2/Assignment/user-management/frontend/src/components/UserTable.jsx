import React from "react";

const UserTable = ({ users, setEditingUser, deleteUser }) => {
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.location}</td>
                            <td className="action-buttons">
                                <button className="edit-btn" onClick={() => setEditingUser(user)}>Edit</button>
                                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="no-data">No users available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default UserTable;
