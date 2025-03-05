import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getTasks = (token) => axios.get(`${API_URL}/tasks`, { headers: { Authorization: token } });
export const addTask = (token, title) => axios.post(`${API_URL}/tasks`, { title }, { headers: { Authorization: token } });
export const deleteTask = (token, id) => axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: token } });
