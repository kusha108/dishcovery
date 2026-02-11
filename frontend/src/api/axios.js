import axios from "axios";

/* ===== BASE URL SWITCH ===== */
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://dishcovery-f03b.onrender.com/api"
    : "http://localhost:5000/api";

/* ===== AXIOS INSTANCE ===== */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/* ===== ATTACH TOKEN ===== */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ===== GLOBAL ERROR HANDLER ===== */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {

      // Unauthorized
      if (err.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }

      // Server error
      if (err.response.status >= 500) {
        console.error("Server error:", err.response.data);
      }

    } else if (err.code === "ECONNABORTED") {
      console.error("Request timeout");
    } else {
      console.error("Network error");
    }

    return Promise.reject(err);
  }
);

export default api;
