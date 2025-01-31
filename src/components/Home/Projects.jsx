import { NavLink } from 'react-router-dom'
import classes from './Projects.module.css'
import GitHubLink from '../GitHubLinks/GitHubLink'

export default function Projects(props) {
  const { name, githubLinks, img, description, futurePlans, nav } = props
  return (
    <div className={classes["card"]}>
      <div className={classes["description"]}>
        <header>
          <h3 className={classes.link}>
            <NavLink to={nav}>
              {name}
            </NavLink>
          </h3>
        </header>
        <p>{description}</p>
        {futurePlans && <p>{futurePlans}</p>}
        {githubLinks.map((githubLink, index) => (
          <GitHubLink
            key={index}
            caption={githubLink.name}
            url={githubLink.url}
          />
        ))}
      </div>
      <NavLink to={nav}>
        <img src={img} className={classes.imagelink} />
      </NavLink>
    </div>
  )
}