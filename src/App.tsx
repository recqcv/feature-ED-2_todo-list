import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Todo from "./pages/Todo/Todo";
import Authentication from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import RootLayout from "./pages/RootPage/RootLayout";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Cabinet from "./components/Cabinet";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/use-auth";
import { getUserData } from "./store/slices/authSlice";
import CabinetPage from "./pages/Cabinet/CabinetPage";

const router = createBrowserRouter([
  {
    path: '/feature-ED-2_todo-list',
    element: <RootLayout />,
    children:
      [
        { path: 'auth', element: <Authentication /> },
        { path: 'registration', element: <Registration /> },
        {
          path: 'todo', element: (
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          )
        },
        {
          path: 'cabinet', element: (
            <ProtectedRoute>
              <CabinetPage />
            </ProtectedRoute>
          )
        },
      ]
  },

])

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserData());
    }
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
