const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

let tasks = [];

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("initialTasks", tasks);

  socket.on("taskAdded", (task) => {
    tasks.push(task);
    io.emit("taskUpdated", tasks);
    io.emit("userNotified", { message: "A new task has been added." });
  });

  socket.on("taskDeleted", (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    io.emit("taskUpdated", tasks);
    io.emit("userNotified", { message: "A task has been deleted." });
  });

  socket.on("taskUpdated", (updatedTask) => {
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    io.emit("taskUpdated", tasks);
    io.emit("userNotified", { message: "A task has been updated." });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));