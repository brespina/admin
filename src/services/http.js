import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 10_000,
});

// ➜ place for future JWT interceptor
// http.interceptors.request.use(cfg => { cfg.headers.Authorization = `Bearer ${token}`; return cfg });

export default http;