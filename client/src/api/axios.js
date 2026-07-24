import axios from "axios";

// ==========================================
// API INSTANCE
// ==========================================

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

API.interceptors.request.use(
  (config) => {
    // Don't overwrite Authorization if it already exists
    if (!config.headers.Authorization) {
      // Check which section we're currently using
      const isAdminRoute = window.location.pathname.startsWith("/admin");

      const token = isAdminRoute
        ? localStorage.getItem("adminToken")
        : localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;

      // ======================================
      // STUDENT PROTECTED PAGES
      // ======================================

      const isStudentProtectedPage =
        path.startsWith("/dashboard") ||
        path.startsWith("/quiz") ||
        path.startsWith("/history") ||
        path.startsWith("/profile");

      if (isStudentProtectedPage) {
        localStorage.removeItem("token");
        localStorage.removeItem("student");
        localStorage.removeItem("student_id");

        window.location.href = "/";
      }

      // ======================================
      // ADMIN PROTECTED PAGES
      // ======================================

      const isAdminPage =
        path.startsWith("/admin") &&
        !path.startsWith("/admin/login");

      if (isAdminPage) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;