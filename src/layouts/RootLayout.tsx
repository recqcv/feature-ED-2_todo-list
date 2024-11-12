import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MainNavigation from "@/components/MainNavigation";
import classes from "./RootLayout.module.css"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-auth";
import { refreshAuthToken } from "@/api/auth";
import { clearAuthState, setTokens } from "@/store/slices/authSlice";


export default function RootLayout() {
  const location = useLocation();
  const isRootPart = location.pathname === '/feature-ED-2_todo-list' || location.pathname === '/feature-ED-2_todo-list/';
  const navigate = useNavigate();
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Начало загрузки компонента...");
      
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        console.log("Нет refreshToken, перенаправление на страницу входа.");
        setIsLoading(false);
        navigate('/feature-ED-2_todo-list/auth');
        return;
      }

      try {
        console.log("Пробуем обновленить токен");
        const newTokens = await refreshAuthToken(storedRefreshToken);
        dispatch(setTokens(newTokens));
        console.log("Токен успешно обновлен:", newTokens);
      } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
        dispatch(clearAuthState());
        // navigate('/feature-ED-2_todo-list/auth');
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, [dispatch, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      {!isRootPart && (
        <main className={classes.navigation}>
          <MainNavigation />
        </main>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
}