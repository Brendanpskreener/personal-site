import classes from './GitHubLink.module.css'
import gitHubLogo from '../../assets/github-mark-white.png'

export default function GitHubLink(props) {
  const { url, caption } = props
  return (
    <div className={classes.container}>
      <a target="_blank" href={url} className={classes.anchor}>
        <img src={gitHubLogo}></img>
        <p className={classes.caption}>{caption}</p>
      </a>
    </div>
  )
}