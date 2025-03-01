const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
    { id: 1, name: "Ashish", email: "ashish@example.com", age: 22, location: "India" },
    { id: 2, name: "John Doe", email: "john@example.com", age: 25, location: "USA" }
];

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Add new user
app.post("/users", (req, res) => {
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
    res.json(newUser);
});

// Edit user
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.map(user => (user.id === userId ? { ...user, ...req.body } : user));
    res.json({ message: "User updated" });
});

// Delete user
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: "User deleted" });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
