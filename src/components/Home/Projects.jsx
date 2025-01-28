import gitHubLogo from '../../assets/github-mark-white.png'
import classes from './Projects.module.css'

export default function Projects(props) {
  const { name, url, url2, img, description, futurePlans } = props
  return (
    <div className={classes["card"]}>
      <div className={classes["description"]}>
        <header>
          <h3>{name}</h3>
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
      <img src={img} />
    </div>
  )
}