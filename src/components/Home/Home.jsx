import { useState } from 'react'
import classes from './Home.module.css'

export default function Home() {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount(prevCount => prevCount + 1)
  }

  function handleDecrement() {
    if (count > 0) {
      setCount(prevCount => prevCount - 1)
    }
  }

  return (
    <>
      <h1 className={classes.title}>Brendan Schreiner</h1>
      <div className={classes.card}>
        <button className={classes.button} onClick={handleIncrement}>
          +
        </button>
        <button className={classes.button}>
          count is {count}
        </button>
        <button className={classes.button} onClick={handleDecrement}>
          -
        </button>
      </div>
    </>
  )
}