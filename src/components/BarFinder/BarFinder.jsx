import { useContext } from "react"
import UserInput from './UserInput'
import Pagination from './Pagination'
import BarList from './BarList'
import LoadingRing from '../UI/LoadingRing'
import classes from './BarFinder.module.css'
import { BarFinderContext } from "../../store/BarFinderContext"

export default function BarFinder() {
  const { loading, searchLoading } = useContext(BarFinderContext)
  //loading determines whether or not the child components render
  //searchLoading only blocks the barList component specifically
  return (
    <>
      <h1 className={classes.title}>
        Bar Finder
      </h1>
      {loading ? <div className={classes.loading}><LoadingRing /></div> :
        <div className={classes.container}>
          <UserInput />
          {searchLoading ? <div className={classes.loading}><LoadingRing /></div> : <BarList />}
          <Pagination />
        </div>}
    </>
  )
}