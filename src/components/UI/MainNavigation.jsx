import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import { useState, useCallback, useContext, memo } from 'react'
import { AuthContext } from '../../store/AuthContext'

const NavigationLinks = memo(({ getNavLinkClassName, closeMenu }) => (
  <>
    <NavLink
      to='/'
      className={getNavLinkClassName}
      onClick={closeMenu}
      end>
      Home
    </NavLink>
    <NavLink
      to='/barfinder'
      className={getNavLinkClassName}
      onClick={closeMenu}
    >
      Bar Finder
    </NavLink>
    <NavLink
      to='store'
      className={getNavLinkClassName}
      onClick={closeMenu}
    >
      Store
    </NavLink>
  </>
))

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { token, loading, redirectToLogin, logout } = useContext(AuthContext)
  const toggleMenu = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])
  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])
  const getNavLinkClassName = useCallback(({ isActive }) =>
    isActive ? classes.active : undefined
    , [])

  return (
    <>
      <div className={classes.trigger} onClick={toggleMenu}>
        <span className={classes.burger}></span>
        <span className={classes.burger}></span>
        <span className={classes.burger}></span>
      </div>
      <div className={isOpen ? classes.open : classes.list}>
        <NavigationLinks
          getNavLinkClassName={getNavLinkClassName}
          closeMenu={closeMenu}
        />
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