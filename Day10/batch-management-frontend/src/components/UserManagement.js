import { useState, useEffect } from "react";
import { getUsers, addUser, deleteUser, updateUser } from "../api/userApi";
import "../assets/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ 
    email: "", 
    password: "", 
    firstName: "", 
    lastName: "", 
    roleId: "", 
    managerId: "" 
  });
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ 
    email: "", 
    password: "", 
    firstName: "", 
    lastName: "", 
    roleId: "", 
    managerId: "" 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log("Fetched users:", response);
  
      if (response?.data?.$values) {
        setUsers(response.data.$values);
      } else if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Unexpected API response format:", response);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Store user being edited
    setUpdatedUser({
      id: user.id,  // Ensure the ID is included in the state
      email: user.email,
      password: "", // Leave blank for security
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      managerId: user.managerId || ""
    });
  };
  
  const handleAddOrUpdateUser = async () => {
    if (editingUser) {
      // Ensure ID is passed for updating
      const updatedData = { ...updatedUser, id: editingUser.id };
  
      try {
        await updateUser(editingUser.id, updatedData);
        setUsers(users.map(user => user.id === editingUser.id ? { ...updatedData } : user));
        setSuccess("User updated successfully!");
      } catch (error) {
        console.error("Error updating user:", error.response?.data);
        setError(error.response?.data?.message || "Failed to update user. Please try again.");
      }
    } else {
      // Handle adding a new user
      try {
        const response = await addUser(newUser);
        setUsers([...users, { ...newUser, id: response.data.id }]);
        setSuccess("User added successfully!");
      } catch (error) {
        console.error("Error adding user:", error.response?.data);
        setError(error.response?.data?.message || "Failed to add user. Please try again.");
      }
    }
  
    setNewUser({ email: "", password: "", firstName: "", lastName: "", roleId: "", managerId: "" });
    setUpdatedUser({ email: "", password: "", firstName: "", lastName: "", roleId: "", managerId: "" });
    setEditingUser(null);
    setError("");
    setTimeout(() => setSuccess(""), 3000);
  };  
    
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form 
        className="user-form" 
        onSubmit={(e) => { e.preventDefault(); handleAddOrUpdateUser(); }}
      >
        <input 
    type="email" 
    placeholder="Email" 
    value={editingUser ? updatedUser.email : newUser.email} 
    onChange={(e) => {
      editingUser 
        ? setUpdatedUser({ ...updatedUser, email: e.target.value }) 
        : setNewUser({ ...newUser, email: e.target.value });
    }} 
    required 
  />
  
  <input 
    type="password" 
    placeholder="Password (Leave blank to keep unchanged)" 
    value={editingUser ? updatedUser.password : newUser.password} 
    onChange={(e) => {
      editingUser 
        ? setUpdatedUser({ ...updatedUser, password: e.target.value }) 
        : setNewUser({ ...newUser, password: e.target.value });
    }} 
  />
  
  <input 
    type="text" 
    placeholder="First Name" 
    value={editingUser ? updatedUser.firstName : newUser.firstName} 
    onChange={(e) => {
      editingUser 
        ? setUpdatedUser({ ...updatedUser, firstName: e.target.value }) 
        : setNewUser({ ...newUser, firstName: e.target.value });
    }} 
    required 
  />
  
  <input 
    type="text" 
    placeholder="Last Name" 
    value={editingUser ? updatedUser.lastName : newUser.lastName} 
    onChange={(e) => {
      editingUser 
        ? setUpdatedUser({ ...updatedUser, lastName: e.target.value }) 
        : setNewUser({ ...newUser, lastName: e.target.value });
    }} 
    required 
  />
  
  <input 
    type="number" 
    placeholder="Role ID" 
    value={editingUser ? updatedUser.roleId : newUser.roleId} 
    onChange={(e) => {
      editingUser 
        ? setUpdatedUser({ ...updatedUser, roleId: e.target.value }) 
        : setNewUser({ ...newUser, roleId: e.target.value });
    }} 
    required 
  />
  
  <input 
    type="number" 
    placeholder="Manager ID (Optional)" 
    value={editingUser ? updatedUser.managerId : newUser.managerId} 
    onChange={(e) => {
      editingUser 
        ? setUpdatedUser({ ...updatedUser, managerId: e.target.value }) 
        : setNewUser({ ...newUser, managerId: e.target.value });
    }} 
  />
  
  <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
</form>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role ID</th>
            <th>Manager ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.roleId}</td>
                <td>{user.managerId || "N/A"}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;