import classes from './Home.module.css'
import storeImg from '../assets/Store.png'
import barFinderImg from '../assets/BarFinder.png'
import Projects from '../components/Home/Projects'

export default function Home() {
  const projects = [
    {
      name: 'AI Store',
      description: 'Developed my own REST API using BlurHash, Pagination, optional chaining, CI/CD, Github Actions, Serverless, DynamoDB, AWS Lambda, S3, and OpenSearch (Elastic Search) to create a store page populated with AI generated products.',
      futurePlans: 'Future State: Add user auth + event pipeline',
      githubLinks: [
        {
          name: 'Front End',
          url: 'https://github.com/Brendanpskreener/personal-site/tree/main/src/components/Store'
        },
        {
          name: 'Back End',
          url: 'https://github.com/Brendanpskreener/fake-store'
        }
      ],
      nav: '/store',
      image: storeImg
    },
    {
      name: 'Bar Finder',
      description: 'Developed a React app hitting OpenBrewery API with React Hooks, Redux/Context management, Paginated results, CSS animations & transitions, async await, two-way binding, conditional content, etc',
      githubLinks: [
        {
          name: 'Front End',
          url: 'https://github.com/Brendanpskreener/personal-site/tree/main/src/components/BarFinder'
        }
      ],
      nav: '/barfinder',
      image: barFinderImg
    }
  ]

  return (
    <>
      <div className={classes["home"]}>
        <p>Hey there! I'm <span>Brendan.</span></p>
        <div className={classes["projects"]}>
          <h2>Projects</h2>
          <div className={classes["content"]}>
            {projects.map((project, index) => (
              <Projects
                key={index}
                name={project.name}
                description={project.description}
                futurePlans={project.futurePlans}
                nav={project.nav}
                img={project.image}
                githubLinks={project.githubLinks}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}