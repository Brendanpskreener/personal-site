import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'

export default function MainNavigation() {

  return (
    <ul className={classes.list}>
      <li><NavLink
        to='/'
        className={({ isActive }) => isActive ? classes.active : undefined}
        end>Home</NavLink></li>
      <li>
        <a>My Projects</a>
        <ul className={classes.dropdown}>
          <li><NavLink
            to='/barfinder'
            className={({ isActive }) => isActive ? classes.active : undefined}>Bar Finder</NavLink></li>
          <li><NavLink
            to='pomodoro'
            className={({ isActive }) => isActive ? classes.active : undefined}>Pomodoro</NavLink></li>
        </ul>
      </li>
    </ul>
  )
}