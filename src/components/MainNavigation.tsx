import { NavLink } from "react-router-dom"
import classes from "./MainNavigation.module.css"
import { useAppDispatch, useAppSelector } from "../hooks/use-auth"

export default function MainNavigation() {
  const dispatch = useAppDispatch()
  const isLogged = useAppSelector((state) => !!state.auth.accessToken);


  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {isLogged && (
            <>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/todo" className={({ isActive }) => (isActive ? classes.active : undefined)}>Todo</NavLink></li>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/cabinet" className={({ isActive }) => (isActive ? classes.active : undefined)}>Cabinet</NavLink></li>
              <li className={classes.navigation_li}><NavLink to="/feature-ED-2_todo-list/users" className={({ isActive }) => (isActive ? classes.active : undefined)}>Users</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

