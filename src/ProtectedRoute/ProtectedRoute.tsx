import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use-auth";


export default function ProtectedRoute({ children }: { children: JSX.Element }) {

  const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);

  if (!isLoggedIn) {
    return <Navigate to="/feature-ED-2_todo-list/auth" replace />;
  }
  return children
}