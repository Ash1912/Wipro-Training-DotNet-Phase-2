import React, { createContext, useState, useCallback } from "react";
import { getTasks } from "../services/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async (token) => {
        try {
            const { data } = await getTasks(token);
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
