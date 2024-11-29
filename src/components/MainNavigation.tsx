import { NavLink } from "react-router-dom"
import classes from "./MainNavigation.module.css"
import { useAppDispatch, useAppSelector } from "../hooks/use-auth"
import { logout } from "../store/slices/authSlice"

export default function MainNavigation() {
  const dispatch = useAppDispatch()
  const isLogged = useAppSelector((state) => !!state.auth.accessToken);

  async function handleLogout() {
    await dispatch(logout());
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {!isLogged && (
            <>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/auth" className={({ isActive }) => (isActive ? classes.active : undefined)}>Login</NavLink></li>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/registration" className={({ isActive }) => (isActive ? classes.active : undefined)}>Register</NavLink></li>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/cabinet" className={({ isActive }) => (isActive ? classes.active : undefined)}>Cabinet</NavLink></li>
            </>
          )}
          {isLogged && (
            <>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/todo" className={({ isActive }) => (isActive ? classes.active : undefined)}>Todo</NavLink></li>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/cabinet" className={({ isActive }) => (isActive ? classes.active : undefined)}>Cabinet</NavLink></li>
              <li className={classes.navigation_li}><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

