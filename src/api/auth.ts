import axios, { AxiosRequestConfig } from "axios";
import {
  UserRegistration,
  AuthData,
  RefreshToken,
  Profile,
  ProfileRequest,
  PasswordRequest,
  Token
} from "../types/authTypes";


export const api = axios.create({
  withCredentials: true,
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },

})

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config;
})

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && error.config && !error.config._retry) {
      originalRequest._retry = true
      try {
        await refreshAuthToken();
        error.config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return api.request(originalRequest);
      } catch (err: any) {
        console.log('не получилось обновить токен: ', err);
        throw err
      }
    }
    throw error
  }
)

export const refreshAuthToken = async (): Promise<Token> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }
    const res = await api.post<Token>('/auth/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = res.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления токена')
  }
}

// export const signin = async (authData: AuthData): Promise<Token> => {
//   try {
//     const res = await api.post<Token>('/auth/signin', { authData })
//     if (res.status === 200) {
//       const { accessToken, refreshToken } = res.data;
//       console.log('успешная авториация')
//       localStorage.setItem('accessToken', accessToken);
//       localStorage.setItem('refreshToken', refreshToken);
//       return res.data;
//     } else {
//       throw new Error('Неуспешная авторизация, статус: ' + res.status);
//     }
//   } catch (error) {
//     throw console.error(error);
//   }
// }

// export const signup = async (userData: UserRegistration): Promise<Profile> => {
//   try {
//     const res = await api.post<Profile>('/auth/signup', userData)
//     console.log(res.data)
//     return res.data
//   } catch (error) {
//     throw console.error(error);
//   }
// }

// export const logout = async () => {
//   await api.get('/user/logout');
//   localStorage.clear();
// }

// export const getProfile = async (): Promise<Profile> => {
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     const res = await api.get<Profile>('/user/profile', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     return res.data;
//   } catch (error) {
//     throw console.error(error);
//   }
// }

// export const updateProfile = async (profileData: ProfileRequest): Promise<Profile> => {
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     const res = await api.put<Profile>('/user/profile', profileData, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     return res.data;
//   } catch (error) {
//     throw console.error(error);
//   }
// }

// export const resetPassword = async (passwordData: PasswordRequest): Promise<void> => {
//   const accessToken = localStorage.getItem('accessToken');
//   await api.put('/user/profile/reset-password', passwordData,
//     {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }
//   )
// }