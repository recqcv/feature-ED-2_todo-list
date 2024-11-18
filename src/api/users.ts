import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
  withCredentials: true,
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  }
})

api.interceptors.request.use((config) => {
  const token = getToken().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && error.config && !error.config._retry) {
      originalRequest._retry = true
      try {
        // await refreshAuthToken();
        error.config.headers.Authorization = `Bearer ${getToken().accessToken}`;
        return api.request(originalRequest);
      } catch (err: any) {
        console.log('не получилось обновить токен: ', err);
        throw err
      }
    }
    throw error
  }
)