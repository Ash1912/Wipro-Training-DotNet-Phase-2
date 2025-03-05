import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("initialTasks", (data) => setTasks(data));
    socket.on("taskUpdated", (data) => setTasks(data));
    socket.on("userNotified", (data) => setNotification(data.message));
  }, []);

  const addTask = (task) => socket.emit("taskAdded", task);
  const updateTask = (task) => socket.emit("taskUpdated", task);
  const deleteTask = (id) => socket.emit("taskDeleted", id);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, notification }}>
      {children}
    </TaskContext.Provider>
  );
};