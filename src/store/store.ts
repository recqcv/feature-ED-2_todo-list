import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReduser from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReduser
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
