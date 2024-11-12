import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Authentication from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Todo from "./pages/Todo/Todo";
import CabinetPage from "./pages/Cabinet/CabinetPage";

export const router = createBrowserRouter([
  {
    path: '/feature-ED-2_todo-list',
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'auth', element: <Authentication /> },
          { path: 'registration', element: <Registration /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'todo', element: <Todo /> },
          { path: 'cabinet', element: <CabinetPage /> },
        ],
      },
    ],
  },
]);