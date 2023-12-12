import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import { useState } from 'react'

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  function toggleMenu() {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <div className={classes.trigger} onClick={toggleMenu}>
        <span className={classes.burger}></span>
        <span className={classes.burger}></span>
        <span className={classes.burger}></span>
      </div>
      <div className={isOpen ? classes.open : classes.list}>
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
    </>

  )
}