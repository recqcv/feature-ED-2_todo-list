import { NavLink } from "react-router-dom"
import classes from "./MainNavigation.module.css"

export default function HomePageNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li className={classes.navigation_li}><NavLink to='/feature-ED-2_todo-list/auth' className={({ isActive }) => (isActive ? classes.active : undefined)}>Login</NavLink></li>
          <li className={classes.navigation_li}><NavLink to='/feature-ED-2_todo-list/registration' className={({ isActive }) => (isActive ? classes.active : undefined)}>Registration</NavLink></li>
        </ul>
      </nav>
    </header >
  )
}