import api from "./api";

export const getUsers = async () => {
  return api.get("/Users");
};

export const addUser = async (userData) => {
  return api.post("/Users", userData);
};

export const updateUser = async (id, userData) => {
  return api.put(`/Users/${id}`, userData); // Don't include ID in body
};

export const deleteUser = async (id) => {
  return api.delete(`/Users/${id}`);
};
