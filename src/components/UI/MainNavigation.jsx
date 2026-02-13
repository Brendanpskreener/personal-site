import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../store/AuthContext'

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { token, loading, redirectToLogin, logout } = useContext(AuthContext)
  function toggleMenu() {
    setIsOpen((prevState) => !prevState)
  }
  function closeMenu() {
    setIsOpen(false)
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
          onClick={closeMenu}
          end>
          Home
        </NavLink>
        <NavLink
          to='/barfinder'
          className={({ isActive }) => isActive ? classes.active : undefined}
          onClick={closeMenu}
        >
          Bar Finder
        </NavLink>
        <NavLink
          to='store'
          className={({ isActive }) => isActive ? classes.active : undefined}
          onClick={closeMenu}
        >
          Store
        </NavLink>
        {loading ? (
          <a>•••</a>
        ) : token ? (
          <a onClick={() => { logout(); closeMenu(); }}>Logout</a>
        ) : (
          <a onClick={() => { redirectToLogin(); closeMenu(); }}>Login</a>
        )}
      </div>
    </>

  )
}