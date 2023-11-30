import classes from './MainNavigation.module.css'

export default function MainNavigation({ onClick }) {

  return (
    <ul className={classes.list}>
      <li><a onClick={() => onClick('home')}>Home</a></li>
      <li>
        <a>My Projects</a>
        <ul className={classes.dropdown}>
          <li><a onClick={() => onClick('barFinder')}>Bar Finder</a></li>
          <li><a onClick={() => onClick('pomodoro')}>Pomodoro</a></li>
        </ul>
      </li>
    </ul>
  )
}