import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Todo from "./pages/Todo/Todo";
import CabinetPage from "./pages/Cabinet/CabinetPage";
import LoginPage from "@/pages/Auth/Login/LoginPage";
import RegisterPage from "@/pages/Auth/Registration/RegisterPage";

export const router = createBrowserRouter([
  {
    path: '/feature-ED-2_todo-list/auth',
    element: <AuthLayout />,
    children: [
      { path: '', element: <LoginPage /> },
      { path: 'registration', element: <RegisterPage /> },
    ],
  },
  {
    path: '/feature-ED-2_todo-list',
    element: <MainLayout />,
    children: [
      { path: 'todo', element: <Todo /> },
      { path: 'cabinet', element: <CabinetPage /> },
    ],
  },
]);