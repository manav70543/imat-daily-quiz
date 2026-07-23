import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// ==============================
// Request Interceptor
// ==============================
API.interceptors.request.use((config) => {

  // Don't overwrite Authorization if it already exists
  if (!config.headers.Authorization) {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// ==============================
// Response Interceptor
// ==============================
API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      // Student pages
      if (
        window.location.pathname.startsWith("/dashboard") ||
        window.location.pathname.startsWith("/quiz") ||
        window.location.pathname.startsWith("/history") ||
        window.location.pathname.startsWith("/profile")
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("student");
        localStorage.removeItem("student_id");

        window.location.href = "/";
      }

      // Admin pages
      if (
        window.location.pathname.startsWith("/admin")
      ) {

        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;