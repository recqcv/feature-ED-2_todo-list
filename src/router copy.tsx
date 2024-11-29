import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Authentication from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import Todo from "./pages/Todo/Todo";
import CabinetPage from "./pages/Cabinet/CabinetPage";

export const router = createBrowserRouter([
  {
    path: '/app',
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: 'todo', element: <Todo /> },
          { path: 'cabinet', element: <CabinetPage /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'auth', element: <Authentication /> },
      { path: 'registration', element: <Registration /> },
    ],
  },

]);