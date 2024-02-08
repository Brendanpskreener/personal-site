import { useContext } from 'react'
import classes from './StorePagination.module.css'
import { StoreContext } from '../../store/StoreContext'

export default function StorePagination(props) {
  const { totalPageCount, onPageChange, currentPageNumber: currentPage } = useContext(StoreContext)
  const { siblingCount = 1 } = props
  const totalPageNumbers = siblingCount + 5

  function range(start, end) {
    let length = end - start + 1
    const result = Array.from({ length }, (element, index) => index + start)
    return result
  }

  function main() {
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)
      return [...leftRange, '...', totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, '...', ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
    }
  }

  function nextPage() {
    if (currentPage !== totalPageCount) {
      onPageChange(currentPage + 1)
    }
  }
  function previousPage() {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1)
    }
  }

  function changePage(pageNumber) {
    if (pageNumber !== '...') {
      onPageChange(pageNumber)
    }
  }

  const paginationRange = main()

  return (
    <span className={classes['pagination-container']}>
      <li className={classes["pagination-item"]} onClick={previousPage} disabled={currentPage === 1}>
        {'<'}
      </li>
      {paginationRange.map((pageNumber) => {
        return (
          <li className={pageNumber === currentPage ? classes["pagination-item-selected"] : classes["pagination-item"]} key={Math.random()} onClick={() => changePage(pageNumber)} disabled={pageNumber === '...'}>
            {pageNumber}
          </li>
        )
      })}
      <li className={classes["pagination-item"]} onClick={nextPage} disabled={currentPage === totalPageCount}>
        {'>'}
      </li>
    </span>
  )
}