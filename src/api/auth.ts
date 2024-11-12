import axios, { AxiosRequestConfig } from "axios";
import {
  Token
} from "../types/authTypes";



let token = {
  accessToken: null as string | null,
  refreshToken: localStorage.getItem('refreshToken'),
  exp: null as number | null,
}

export const setToken = (accessToken: string, refreshToken: string) => {
  token.accessToken = accessToken;
  token.refreshToken = refreshToken;
  token.exp = getTokenExpiryDate(accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  console.log('Установлен новый токен (setToken):', token);
}

export const getTokenExpiryDate = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp || null;
  } catch (error) {
    console.error('не удалось получить время смерти токена: ', error);
    return null;
  }
}

export const isTokenExpired = (): boolean => {
  if (!token.exp) return true
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= token.exp
}

export const getToken = () => {
  return token;
}

export const killToken = () => {
  token.accessToken = null;
  token.refreshToken = null;
  localStorage.removeItem('refreshToken');
}

export const api = axios.create({
  withCredentials: true,
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(config => {
  const token = getToken();
  if (token.accessToken) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
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

export const refreshAuthToken = async (refreshToken: string): Promise<Token> => {
  if (!refreshToken) {
    console.error("Рефреш токен отсутствует (refreshAuthToken в api)");
    throw new Error("Рефреш токен отсутствует");
  }
  try {
    const res = await api.post<Token>('/auth/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = res.data;
    setToken(accessToken, newRefreshToken);
    return res.data;
  } catch (error) {
    console.error("Ошибка обновления токена (refreshAuthToken в api): ", error);
    throw error;
  }
}