import classes from './Pagination.module.css'

export default function Pagination(props) {
  const { currentPage, previousPage, nextPage, perPage, pageLength } = props

  return (
    <div className={classes.pagination}>
      <button onClick={previousPage} disabled={currentPage === 1}>
        Prev
      </button>
      <div>{currentPage}</div>
      <button onClick={nextPage} disabled={pageLength < perPage}>
        Next
      </button>
    </div>
  )
}