import api from "./api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/Authentication/login", credentials);
    const { token, user } = response.data; // Assuming the API response includes user details

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store user data

    return { token, user };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("/Authentication/refresh", {
      token: localStorage.getItem("token"),
    });

    const newToken = response.data.token;
    localStorage.setItem("token", newToken); // Update token in storage

    return newToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
