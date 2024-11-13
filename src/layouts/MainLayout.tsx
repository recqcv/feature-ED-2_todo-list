import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "@/components/MainNavigation";
import classes from "./MainLayout.module.css"
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/use-auth";
import { refreshAuthToken } from "@/api/auth";
import { clearAuthState, setTokens } from "@/store/slices/authSlice";


export default function MainLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isRefreshing = useRef(false)

  useEffect(() => {
    const initializeAuth = async () => {
      if (isRefreshing.current) return;
      isRefreshing.current = true;

      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        setIsLoading(false);
        navigate('/feature-ED-2_todo-list/auth');
        return;
      }
      try {
        const newTokens = await refreshAuthToken(storedRefreshToken);
        dispatch(setTokens(newTokens));
      } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
        dispatch(clearAuthState());
        navigate('/feature-ED-2_todo-list/auth');
      } finally {
        setIsLoading(false);
        isRefreshing.current = false;
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className={classes.layout}>
      <aside className={classes.sidebar}>
        <MainNavigation />
      </aside>
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
}