import { NavLink } from 'react-router-dom'
import gitHubLogo from '../../assets/github-mark-white.png'
import classes from './Projects.module.css'

export default function Projects(props) {
  const { name, url, url2, img, description, futurePlans, nav } = props
  return (
    <div className={classes["card"]}>
      <div className={classes["description"]}>
        <header>
          <h3 className={classes.link}>
            <NavLink to={nav}>
              {name}
            </NavLink>
          </h3>
          <div>
            <a target="_blank" href={url}>
              <img src={gitHubLogo}></img>
            </a>
            {url2 && <a target="_blank" href={url2}>
              <img src={gitHubLogo}></img>
            </a>}
          </div>
        </header>
        <p>{description}</p>
        {futurePlans && <p>{futurePlans}</p>}
      </div>
      <NavLink to={nav}>
        <img src={img} className={classes.imagelink} />
      </NavLink>
    </div>
  )
}