import gitHubLogo from '../../assets/github-mark-white.png'
import classes from './Projects.module.css'

export default function Projects(props) {
  const { name, url, img, description } = props
  return (
    <div className={classes["card"]}>
      <div className={classes["description"]}>
        <header>
          <h3>{name}</h3>
          <a target="_blank" href={url}>
            <img src={gitHubLogo}></img>
          </a>
        </header>
        <p>{description}</p>
      </div>
      <img src={img} />
    </div>
  )
}