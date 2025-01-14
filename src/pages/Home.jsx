import classes from './Home.module.css'
import storeImg from '../assets/Store.png'
import barFinderImg from '../assets/BarFinder.png'
import Projects from '../components/Home/Projects'

export default function Home() {
  return (
    <>
      <div className={classes["home"]}>
        <p>Hey there! I'm <span>Brendan.</span></p>
        <div className={classes["projects"]}>
          <h2>Projects</h2>
          <div className={classes["content"]}>
            <Projects
              name='AI Store'
              url='https://github.com/Brendanpskreener/personal-site/tree/main/src/components/Store'
              img={storeImg}
              description='Developed my own REST API using BlurHash, Pagination, optional chaining, CI/CD, Github Actions, Serverless, DynamoDB, AWS Lambda, S3, and OpenSearch (Elastic Search) to create a store page populated with AI generated products.'
            />
            <Projects
              name='Bar Finder'
              url='https://github.com/Brendanpskreener/personal-site/tree/main/src/components/BarFinder'
              img={barFinderImg}
              description='Developed a React app hitting OpenBrewery API with React Hooks, Redux/Context management, Paginated results, CSS animations & transitions, async await, two-way binding, conditional content, etc'
            />
          </div>
        </div>
      </div>
    </>
  )
}