import classes from './Home.module.css'

export default function Home() {
  return (
    <>
      <div className={classes["card"]}>
        <p>Hey there! I'm <span>Brendan Schreiner</span>, an aspiring full-stack developer proficient in React, JavaScript, and NodeJS.</p>
        <p>With a passion for problem-solving, I strive to build scalable and efficient applications.</p>
      </div>
    </>
  )
}