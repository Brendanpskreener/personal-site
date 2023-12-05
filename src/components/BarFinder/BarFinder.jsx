import { useContext } from "react"
import UserInput from './UserInput'
import Pagination from './Pagination'
import BarList from './BarList'
import classes from './BarFinder.module.css'
import { BarFinderContext } from "../../store/BarFinderContext"

export default function BarFinder() {
  const { loading } = useContext(BarFinderContext)

  return (
    <>
      <h1 className={classes.title}>
        Bar Finder
      </h1>
      {loading ? <div className={classes.loading}>Loading...</div> :
        <div className={classes.container}>
          <UserInput />
          <BarList />
          <Pagination />
        </div>}
    </>
  )
}