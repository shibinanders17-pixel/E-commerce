
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api"
});

// ─── Request Interceptor ───────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Admin routes-la adminToken use pannuvom!
    const isAdminRoute = config.url?.startsWith("/admin");
    const token = isAdminRoute
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ──────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAdminRoute = error.config?.url?.startsWith("/admin");

      if (isAdminRoute) {
        // Admin → Admin login page!
        localStorage.removeItem("adminToken");
        localStorage.removeItem("isAdminLoggedIn");
        window.location.href = "/admin";
      } else {
        // User → User login page!
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;