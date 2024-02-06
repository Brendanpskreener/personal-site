import { createContext, useEffect, useReducer } from "react"
import findProducts from "../interfaces/FindProducts"

const userId = '63d53f91-4ea5-4bc5-92e4-c9191687f11d'

const initialState = {
  productList: [],
  pagination: { from: 0, size: 1, total: 0 },
  currentPageNumber: 1,
  userPageSize: 10,
  filtered: 0,
  userId,
  onPageChange: () => { },
  changeFilter: () => { }
}

export const StoreContext = createContext(initialState)

function storeReducer(state, { type, payload }) {
  if (type === 'set_products_list') {
    const { results, pagination } = payload
    return { ...state, productList: results, pagination }
  }
  if (type === 'set_current_page') {
    return { ...state, currentPageNumber: payload }
  }
  if (type === 'set_favorites_filter') {
    return { ...state, filtered: payload, currentPageNumber: 1 }
  }
  return state
}

export default function StoreContextProvider({ children }) {
  const [storeState, storeDispatch] = useReducer(storeReducer, initialState)
  const { productList, pagination, currentPageNumber, userPageSize, filtered, userId } = storeState

  async function getStore(userId) {
    try {
      const { results, pagination } = await findProducts({ from: (currentPageNumber - 1) * userPageSize, size: userPageSize, userId })
      storeDispatch({ type: 'set_products_list', payload: { results, pagination } })
    } catch (error) {
      console.warn(error)
    }
  }

  function onPageChange(page) {
    if (currentPageNumber !== page) {
      storeDispatch({ type: 'set_current_page', payload: page })
    }
  }

  function changeFilter(value) {
    if (filtered !== value) {
      storeDispatch({ type: 'set_favorites_filter', payload: value })
    }
  }

  const totalPageCount = Math.ceil(pagination.total / pagination.size)

  const storeContext = {
    productList,
    pagination,
    currentPageNumber,
    userPageSize,
    filtered,
    totalPageCount,
    onPageChange,
    changeFilter
  }

  useEffect(() => {
    if (filtered === 1) {
      getStore(userId)
    } else {
      getStore()
    }
  }, [currentPageNumber, userPageSize, filtered])

  return (
    <StoreContext.Provider value={storeContext}>
      {children}
    </StoreContext.Provider>
  )
}