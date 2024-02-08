import { createContext, useEffect, useReducer } from "react"
import findProducts from "../interfaces/FindProducts"
import findFavorites from "../interfaces/FindFavorites"

const userId = '63d53f91-4ea5-4bc5-92e4-c9191687f11d'

const initialState = {
  productList: [],
  favoritesList: [],
  pagination: { from: 0, size: 1, total: 0 },
  currentPageNumber: 1,
  userPageSize: 10,
  filtered: 0,
  userId,
  userLoggedIn: true,
  onPageChange: () => { },
  changeFilter: () => { }
}

export const StoreContext = createContext(initialState)

function storeReducer(state, { type, payload }) {
  if (type === 'set_products_list') {
    const { results, pagination } = payload
    return { ...state, productList: results, pagination }
  }
  if (type === 'set_favorites_list') {
    return { ...state, favoritesList: payload }
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
  const { productList, pagination, currentPageNumber, userPageSize, filtered, userId, favoritesList, userLoggedIn } = storeState

  async function getStore(productIds) {
    try {
      const { results, pagination } = await findProducts({ from: (currentPageNumber - 1) * userPageSize, size: userPageSize, productIds })
      storeDispatch({ type: 'set_products_list', payload: { results, pagination } })
    } catch (error) {
      console.warn(error)
    }
  }

  async function getFavorites() {
    try {
      const favorites = await findFavorites(userId)
      storeDispatch({ type: 'set_favorites_list', payload: favorites })
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
    if (filtered !== value && userLoggedIn) {
      storeDispatch({ type: 'set_favorites_filter', payload: value })
    }
  }

  const totalPageCount = Math.ceil(pagination.total / pagination.size)

  const storeContext = {
    productList,
    favoritesList,
    userId,
    pagination,
    currentPageNumber,
    userPageSize,
    filtered,
    totalPageCount,
    onPageChange,
    changeFilter,
    getFavorites
  }

  useEffect(() => {
    if (filtered === 0) {
      getStore()
    }
  }, [currentPageNumber, userPageSize, filtered])

  useEffect(() => {
    if (filtered === 1) {
      const productIds = favoritesList.join(',')
      getStore(productIds)
    }
  }, [currentPageNumber, userPageSize, filtered, favoritesList])

  useEffect(() => {
    if (userLoggedIn) {
      getFavorites()
    }
  }, [])

  return (
    <StoreContext.Provider value={storeContext}>
      {children}
    </StoreContext.Provider>
  )
}