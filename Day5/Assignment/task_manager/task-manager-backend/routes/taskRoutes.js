const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});

// Add task
router.post("/", authMiddleware, async (req, res) => {
    const { title } = req.body;
    const task = new Task({ userId: req.user.id, title });
    await task.save();
    res.json(task);
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;
