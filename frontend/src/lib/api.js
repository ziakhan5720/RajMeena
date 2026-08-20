import axios from "axios";

// VITE_API_URL must be set in Vercel environment variables to the backend URL.
// For local dev it falls back to localhost:8000.
const API_BASE = import.meta.env.VITE_API_URL?.trim() || "http://localhost:8000";

const api = axios.create({
    baseURL: `${API_BASE}/api/v1`,
    withCredentials: true,
});

export default api;
