import api from "./api";

export const getUsers = async () => {
  return api.get("/Users");
};

export const addUser = async (userData) => {
  return api.post("/Users", userData);
};

export const deleteUser = async (id) => {
  return api.delete(`/Users/${id}`);
};
