import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, UserRegistration, Token, AuthData, RefreshToken } from "../../types/authTypes";
import { api, killToken, refreshAuthToken, setToken } from "@/api/auth";
import { RootState } from "../store";


interface authState {
  user: Profile | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}
const initialState: authState = {
  user: null,
  accessToken: null,
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
}

// let tokenInfo = {
//   accessToken: null as string | null,
//   refreshToken: localStorage.getItem('refreshToken'),
//   exp: null as number | null,
// }

// export const getTokenExpiryDate = (token: string): number | null => {
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.exp || null;
//   } catch (error) {
//     console.error('не удалось получить время смерти токена: ', error);
//     return null;
//   }
// }

// export const setTokenInfo = (accessToken: string, refreshToken: string) => {
//   tokenInfo.accessToken = accessToken;
//   tokenInfo.refreshToken = refreshToken;
//   tokenInfo.exp = getTokenExpiryDate(accessToken);
//   localStorage.setItem('refreshToken', refreshToken);

// }

// export const getTokenInfo = () => {
//   return tokenInfo
// }

// export const killTokenInfo = () => {
//   tokenInfo.accessToken = null;
//   tokenInfo.refreshToken = null;
//   localStorage.removeItem('refreshToken');
// }

// export const isTokenExpiredInfo = (): boolean => {
//   if (!tokenInfo.exp) return true
//   const currentTime = Math.floor(Date.now() / 1000);
//   return currentTime >= tokenInfo.exp
// }


export const registerUser = createAsyncThunk<UserRegistration, UserRegistration>(
  '/auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/signup', userData);
      return res.data;
    } catch (error: any) {
      console.error("Ошибка регистрации:", error)
      return rejectWithValue(error.message || 'Не удалось зарегистрироваться!');
    }
  }
)

export const signin = createAsyncThunk<Token, AuthData>(
  '/auth/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/signin', userData);
      const { accessToken, refreshToken } = res.data;
      setToken(accessToken, refreshToken);
      return res.data;
    } catch (error: any) {
      alert('Неуспешная авторизация, проверьте данные');
      return rejectWithValue(error.message || 'Не удалось авторизоваться!');
    }
  }
)

// export const refreshAuthToken = createAsyncThunk<Token, void>(
//   '/auth/refresh',
//   async (_, { rejectWithValue }) => {
//     try {
//       const refreshToken = getToken().refreshToken;
//       if (!refreshToken) {
//         throw new Error('Нет рефреш токена');
//       }
//       const res = await api.post('/auth/refresh', { refreshToken });
//       const { accessToken, refreshToken: newRefreshToken } = res.data;
//       setToken(accessToken, newRefreshToken);
//       return res.data;
//     } catch (error: any) {
//       console.error("Ошибка обновления токена: ", error)
//       return rejectWithValue(error.message || 'Не удалось обновить токен!');
//     }
//   }
// )


// export const refreshAuthTokenThunk = createAsyncThunk<Token, void, { state: RootState }>(
//   "/auth/refresh",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const refreshToken = getState().auth.refreshToken;
//       if (!refreshToken) {
//         throw new Error("Нет рефреш токена");
//       }
//       const res = await api.post<Token>('/auth/refresh', { refreshToken });
//       const { accessToken, refreshToken: newRefreshToken } = res.data;
//       setToken(accessToken, newRefreshToken);
//       return res.data;
//     } catch (error: any) {
//       console.error("Ошибка обновления токена: ", error);
//       return rejectWithValue(error.message || "Не удалось обновить токен!");
//     }
//   }
// );

export const logout = createAsyncThunk<void, void>(
  '/user/logout',
  async (_, { dispatch }) => {
    try {
      await api.get('/user/logout')

    } finally {
      killToken();
      dispatch(authSlice.actions.clearAuthState());
    }

  })

export const getUserData = createAsyncThunk<Profile, void>(
  '/user/profile',
  async () => {
    const res = await api.get<Profile>('/user/profile');
    return res.data;
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state: authState) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    setTokens: (state: authState, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log('функция setTokens, токен установлен: ', state.accessToken)
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(registerUser.pending, (state: authState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state: authState, action: PayloadAction<Profile>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state: authState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signin.pending, (state: authState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state: authState, action: PayloadAction<Token>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
        state.error = null;
      })
      .addCase(signin.rejected, (state: authState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state: authState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state: authState) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state: authState, action: PayloadAction<Profile>) => {
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state: authState, action: PayloadAction<any>) => {
        state.error = action.payload as string;
      })
      // .addCase(refreshAuthTokenThunk.fulfilled, (state: authState, action: PayloadAction<Token>) => {
      //   state.accessToken = action.payload.accessToken;
      //   state.refreshToken = action.payload.refreshToken;
      // })
      // .addCase(refreshAuthTokenThunk.rejected, (state: authState) => {
      //   state.accessToken = null;
      //   state.refreshToken = null;
      // });

  }
})

export const { clearAuthState, setTokens } = authSlice.actions

export default authSlice.reducer