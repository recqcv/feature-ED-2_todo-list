import { Outlet, useLocation } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import HomePageNavigation from "../../components/HomePageNavigation";
import classes from "./RootLayout.module.css"


export default function RootLayout() {
  const location = useLocation();
  const isRootPart = location.pathname === '/feature-ED-2_todo-list'
    || location.pathname === '/feature-ED-2_todo-list/';
  return (
    <>
      {isRootPart &&
        <div>
          <main className={classes.navigation}>
            <HomePageNavigation />
          </main>
          <h2>Залогиньтесь или создайте аккаунт</h2>
        </div>
      }
      {!isRootPart &&
        <div>
          <main className={classes.navigation}>
            <MainNavigation />
          </main>
          <div>
            <Outlet />
          </div>
        </div>
      }
    </>
  );
}