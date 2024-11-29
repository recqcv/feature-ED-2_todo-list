import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Todo from "./pages/Todo/Todo";
import CabinetPage from "./pages/Cabinet/CabinetPage";
import LoginPage from "@/pages/Auth/Login/LoginPage";
import RegisterPage from "@/pages/Auth/Registration/RegisterPage";
import UsersPage from "@/pages/Users/UsersPage";
import UsersProfilePage from '@/pages/Users/UserProfilePage'



export const routeNames = {
  auth: {
    login: '/feature-ED-2_todo-list/auth',
    registration: '/feature-ED-2_todo-list/auth/registration',
  },
  main: '/feature-ED-2_todo-list',
  todo: '/feature-ED-2_todo-list/todo',
  cabinet: '/feature-ED-2_todo-list/cabinet',
  users: {
    UsersPage: '/feature-ED-2_todo-list/users',
    UsersProfilePage: '/feature-ED-2_todo-list/users/:id',
  }
}


export const router = createBrowserRouter([
  {
    path: routeNames.auth.login,
    element: <AuthLayout />,
    children: [
      { path: '', element: <LoginPage /> },
      { path: 'registration', element: <RegisterPage /> },
    ],
  },
  {
    path: routeNames.main,
    element: <MainLayout />,
    children: [
      { path: 'todo', element: <Todo /> },
      { path: 'cabinet', element: <CabinetPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:id', element: <UsersProfilePage /> },
    ],
  },
])