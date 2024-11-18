import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRequest, User, MetaResponse, UserRightsUpdate, UserUpdate } from "@/types/usersTypes";
import { api } from "@/api/users";


interface UsersState {
  users: User[];
  user: User | null
  meta: MetaResponse<User>['meta']
  filters: UserRequest;
  error: string | null;
  loading: boolean
}

const initialState: UsersState = {
  users: [],
  user: null,
  meta: {
    totalAmount: 0,
    sortBy: "id",
    sortOrder: "asc",
  },
  filters: {
    search: "",
    sortBy: "id",
    sortOrder: "asc",
    isBlocked: false,
    limit: 20,
    offset: 0
  },
  error: null,
  loading: false
};

export const getUsers = createAsyncThunk<MetaResponse<User>, UserRequest>(
  'users/getUsers',
  async ({ search, sortBy = "id", sortOrder = "asc", isBlocked, limit = 20, offset = 0 }: UserRequest, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/users", {
        params: {
          search,
          sortBy,
          sortOrder,
          isBlocked,
          limit,
          offset,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res.data || "Не удалось получить список юзеров");
    }
  }
);

export const getUserProfile = createAsyncThunk<User, number>(
  'users/getUserProfile',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.get<User>(`/admin/users/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || "Не удалось получить профиль юзера");
    }
  }
)

export const updateUserData = createAsyncThunk<User, { id: number, userData: UserUpdate }>(
  'users/updateUserData',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const res = await api.put<User>(`/admin/users/${id}`, userData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || "Не удалось обновить профиль юзера");
    }
  }
)

export const deleteUser = createAsyncThunk<User, number>(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/admin/users/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || "Не удалось удалить юзера");
    }
  }
)

export const blockUserById = createAsyncThunk<User, number>(
  'users/blockUserById',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.post<User>(`/admin/users/${id}/block`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || "Не удалось заблокировать юзера");
    }
  }
)

export const unlockUserById = createAsyncThunk<User, number>(
  'users/unlockUserById',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.post<User>(`/admin/users/${id}/unblock`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || "Не удалось разблокировать юзера");
    }
  }
)

export const updateUserRights = createAsyncThunk<User, { id: number, userData: UserRightsUpdate }>(
  'users/updateUserRights',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const res = await api.post<User>(`/admin/users/${id}/rights`, userData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || "Не удалось обновить права юзера");
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder: any) => {
    builder
      // ------------getUsers
      .addCase(getUsers.pending, (state: UsersState) => {
        state.error = null;
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state: UsersState, action: PayloadAction<MetaResponse<User>>) => {
        state.users = action.payload.data;
        state.meta = action.payload.meta
        state.loading = false
        state.error = null;
      })
      .addCase(getUsers.rejected, (state: UsersState, action: PayloadAction<string>) => {
        state.loading = false
        state.error = action.payload
      })
      // ------------getUserProfile
      .addCase(getUserProfile.pending, (state: UsersState) => {
        state.loading = true
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
        state.user = action.payload
        state.loading = false
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state: UsersState, action: PayloadAction<string>) => {
        state.loading = false
        state.error = action.payload
      })
      // ------------updateUserData
      .addCase(updateUserData.pending, (state: UsersState) => {
        state.loading = true
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
        state.users = state.users.map((user: User) => user.id === action.payload.id ? action.payload : user)
        state.user = action.payload
        state.error = null;
        state.loading = false
      })
      .addCase(updateUserData.rejected, (state: UsersState, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
      // ------------deleteUser
      .addCase(deleteUser.pending, (state: UsersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state: UsersState, action: any) => {
        const userId = action.meta.arg
        state.users = state.users.filter((user: User) => user.id !== userId)
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state: UsersState, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
      // ------------blockUserById
      .addCase(blockUserById.pending, (state: UsersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUserById.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
        state.users = state.users.filter((user: User) => user.id !== action.payload.id)
        state.user = action.payload
        state.loading = false;
        state.error = null;
      })
      .addCase(blockUserById.rejected, (state: UsersState, action: PayloadAction<string>) => {
        state.loading = false
        state.error = action.payload
      })
      // ------------unlockUserById
      .addCase(unlockUserById.pending, (state: UsersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlockUserById.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
        state.users = state.users.map((user: User) => user.id === action.payload.id ? action.payload : user)
        state.user = action.payload
        state.loading = false;
        state.error = null;
      })
      .addCase(unlockUserById.rejected, (state: UsersState, action: PayloadAction<string>) => {
        state.loading = false
        state.error = action.payload
      })
      // ------------updateUserRights
      .addCase(updateUserRights.pending, (state: UsersState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRights.fulfilled, (state: UsersState, action: PayloadAction<User>) => {
        state.users = state.users.map((user: User) => user.id === action.payload.id ? action.payload : user)
        state.user = action.payload
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserRights.rejected, (state: UsersState, action: PayloadAction<string>) => {
        state.loading = false
        state.error = action.payload
      });
  }
});

export const { } = userSlice.actions
export default userSlice.reducer