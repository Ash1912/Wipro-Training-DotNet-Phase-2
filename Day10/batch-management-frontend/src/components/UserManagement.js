import { useState, useEffect } from "react";
import { getUsers, addUser, deleteUser } from "../api/userApi";
import "../assets/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ 
    email: "", 
    password: "", 
    firstName: "", 
    lastName: "", 
    roleId: 1 // Default role ID
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setNewUser({ email: "", password: "", firstName: "", lastName: "", roleId: 1 });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <div className="user-inputs">
        <input 
          type="email" 
          value={newUser.email} 
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={newUser.password} 
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
          placeholder="Password" 
          required 
        />
        <input 
          type="text" 
          value={newUser.firstName} 
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} 
          placeholder="First Name" 
          required 
        />
        <input 
          type="text" 
          value={newUser.lastName} 
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} 
          placeholder="Last Name" 
          required 
        />
        <select 
          value={newUser.roleId} 
          onChange={(e) => setNewUser({ ...newUser, roleId: parseInt(e.target.value) })}>
          <option value={1}>Admin</option>
          <option value={2}>Manager</option>
          <option value={3}>User</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            {user.email} ({user.firstName} {user.lastName}) - Role ID: {user.roleId}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
