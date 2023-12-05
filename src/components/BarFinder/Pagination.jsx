import { useContext } from 'react'
import classes from './Pagination.module.css'
import { BarFinderContext } from '../../store/BarFinderContext'

export default function Pagination() {
  const { barlist, currentPage, perPage, previousPage, nextPage } = useContext(BarFinderContext)

  return (
    <div className={classes.pagination}>
      <button onClick={previousPage} disabled={currentPage === 1}>
        Prev
      </button>
      <div>{currentPage}</div>
      <button onClick={nextPage} disabled={barlist.length < perPage}>
        Next
      </button>
    </div>
  )
}