import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 🛑 If /new-tokens itself failed — stop retrying
      if (originalRequest.url.includes("/v1/user/new-tokens")) {
        toast.error("Token expired || login again ")
        console.warn("🔁 Retry blocked: refresh token expired or invalid");
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000)
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await api.post("/v1/user/new-tokens");

        console.log("🔄 Tokens refreshed. Retrying request...");
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        toast.error("Token expired || login again ")
        console.error("❌ Refresh token failed:", refreshError?.response?.data?.message);
        // Redirect only if refresh fails
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
