import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7025/api", // Ensure this is correct
  headers: { "Content-Type": "application/json" }
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Using Token:", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Token refresh logic on 401 error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await api.post("/Authentication/refresh", {
          token: localStorage.getItem("token"),
        });
        localStorage.setItem("token", refreshResponse.data.token);
        error.config.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
        return api(error.config);
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;