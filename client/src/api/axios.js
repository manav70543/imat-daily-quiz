import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired/missing JWT
API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("student");
      localStorage.removeItem("student_id");

      // Prevent redirect loop
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default API;