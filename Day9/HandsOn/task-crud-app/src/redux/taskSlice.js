import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({ id: uuidv4(), ...action.payload });
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index !== -1) state[index] = { ...state[index], ...updatedTask };
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
