import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/use-auth";


export default function ProtectedRoute(): JSX.Element {

  const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);

  return !isLoggedIn ? <Navigate to="/feature-ED-2_todo-list/auth" replace /> : <Outlet />
}