import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, UserRegistration, Token, AuthData, RefreshToken } from "../../types/authTypes";
import { api } from "../../api/auth"


interface authState {
  user: Profile | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}
const initialState: authState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
}


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
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return res.data;
    } catch (error: any) {
      console.error("Ошибка авторизации: ", error)
      return rejectWithValue(error.message || 'Не удалось авторизоваться!');
    }
  }
)

export const refreshAuthToken = createAsyncThunk<Token, RefreshToken>(
  '/auth/refresh',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/refresh', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      return res.data;
    } catch (error: any) {
      console.error("Ошибка обновления токена: ", error)
      return rejectWithValue(error.message || 'Не удалось обновить токен!');
    }
  }
)

export const logout = createAsyncThunk<void, void>(
  '/user/logout',
  async (_, { dispatch }) => {
    try {
      await api.get('/user/logout')

    } finally {
      // localStorage.clear();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(authSlice.actions.clearAuthState());
    }

  })

export const getUserData = createAsyncThunk<Profile, void>(
  '/user/profile',
  async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await api.get<Profile>('/user/profile');
    console.log(res.data)
    return res.data;
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state: any) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    checkAccesToken: (state: any) => {
      state.accessToken = localStorage.getItem('accessToken');
      state.refreshToken = localStorage.getItem('refreshToken');
      if (!state.accessToken && state.refreshToken) {
        state.accessToken = null;
        state.refreshToken = null;
      }
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(registerUser.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state: any, action: PayloadAction<Profile>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signin.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state: any) => {
        state.accessToken = localStorage.getItem('accessToken');
        state.refreshToken = localStorage.getItem('refreshToken');
        state.loading = false;
        state.error = null;
      })
      .addCase(signin.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state: any) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state: any, action: PayloadAction<Profile>) => {
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state: any, action: PayloadAction<any>) => {
        state.error = action.payload as string;
      });

  }
})

export const { clearAuthState, checkAccesToken } = authSlice.actions

export default authSlice.reducer