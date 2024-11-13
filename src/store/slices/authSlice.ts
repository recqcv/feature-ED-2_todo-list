import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, UserRegistration, Token, AuthData } from "@/types/authTypes";
import { api, killToken, setToken } from "@/api/auth";


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

export const logout = createAsyncThunk<void, void>(
  '/user/logout',
  async (_, { dispatch }) => {
    try {
      await api.post('/user/logout')
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
      

  }
})

export const { clearAuthState, setTokens } = authSlice.actions

export default authSlice.reducer