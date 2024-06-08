import classes from './Home.module.css'
import storeImg from '../assets/Store.png'
import barFinderImg from '../assets/BarFinder.png'
import ghImg from '../assets/github-mark-white.png'

export default function Home() {
  return (
    <>
      <div className={classes["home"]}>
        <p>Hey there! I'm <span>Brendan.</span></p>
        <div className={classes["projects"]}>
          <h2>Projects</h2>
          <div className={classes["content"]}>
            <div className={classes["card"]}>
              <div className={classes["description"]}>
                <header>
                  <h3>AI Store</h3>
                  <a href='https://github.com/Brendanpskreener/personal-site/tree/main/src/components/Store' target="_blank">
                    <img src={ghImg}></img>
                  </a>
                </header>
                <p> Developed my own REST API using DynamoDB, AWS Lambda, Node, and OpenSearch (Elastic Search) to create a store page populated with AI generated products.</p>
              </div>
              <img src={storeImg} />
            </div>
            <div className={classes["card"]}>
              <div className={classes["description"]}>
                <header>
                  <h3>Bar Finder</h3>
                  <a href='https://github.com/Brendanpskreener/personal-site/tree/main/src/components/BarFinder' target="_blank">
                    <img src={ghImg}></img>
                  </a>
                </header>
                <p> Developed a React app hitting OpenBrewery API with React Hooks, Redux/Context management, Paginated results, CSS animations & transitions, async await, two-way binding, conditional content, etc</p>
              </div>
              <img src={barFinderImg} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}