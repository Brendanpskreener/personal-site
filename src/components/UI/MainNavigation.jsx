import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'

export default function MainNavigation() {

  return (
    <div className={classes.list}>
      <NavLink
        to='/'
        className={({ isActive }) => isActive ? classes.active : undefined}
        end>
        Home
      </NavLink>
      <NavLink
        to='/barfinder'
        className={({ isActive }) => isActive ? classes.active : undefined}>
        Bar Finder
      </NavLink>
      <NavLink
        to='pomodoro'
        className={({ isActive }) => isActive ? classes.active : undefined}>
        Pomodoro
      </NavLink>
    </div>
  )
}