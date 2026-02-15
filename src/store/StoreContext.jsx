import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from "react"
import findProducts from "../interfaces/findProducts"
import findFavorites from "../interfaces/findFavorites"
import { AuthContext } from './AuthContext'

const initialState = {
  productList: [],
  favoritesList: [],
  pagination: { from: 0, size: 1, total: 0 },
  currentPageNumber: 1,
  userPageSize: 10,
  filtered: 0,
  loading: true,
  onPageChange: () => { },
  changeFilter: () => { }
}

export const StoreContext = createContext(initialState)

function storeReducer(state, { type, payload }) {
  switch (type) {
    case 'set_products_list':
      const { results, pagination } = payload
      return { ...state, productList: results, pagination, loading: false }
    case 'set_favorites_list':
      return { ...state, favoritesList: payload }
    case 'set_current_page':
      return { ...state, currentPageNumber: payload }
    case 'set_favorites_filter':
      return { ...state, filtered: payload, currentPageNumber: 1 }
    default:
      return state
  }
}

export default function StoreContextProvider({ children }) {
  const [storeState, storeDispatch] = useReducer(storeReducer, initialState)
  const { token, userId, getValidToken } = useContext(AuthContext)
  const { productList, pagination, currentPageNumber, userPageSize, filtered, favoritesList, loading } = storeState

  const getStore = useCallback(async (productIds) => {
    try {
      const { results, pagination } = await findProducts({ from: (currentPageNumber - 1) * userPageSize, size: userPageSize, productIds })
      storeDispatch({ type: 'set_products_list', payload: { results, pagination } })
    } catch (error) {
      console.warn(error)
    }
  }, [currentPageNumber, userPageSize])

  const getFavorites = useCallback(async () => {
    try {
      const validToken = await getValidToken()
      if (!validToken) return //Dont call if not logged in
      const favorites = await findFavorites(userId, validToken)
      storeDispatch({ type: 'set_favorites_list', payload: favorites })
    } catch (error) {
      console.warn(error)
    }
  }, [userId, getValidToken])

  const onPageChange = useCallback((page) => {
    if (currentPageNumber !== page) {
      storeDispatch({ type: 'set_current_page', payload: page })
    }
  }, [currentPageNumber])

  const changeFilter = useCallback((value) => {
    // Allow switching to All Products (0) always
    // Only allow switching to Favorites (1) if logged in
    if (filtered !== value && (value === 0 || token)) {
      storeDispatch({ type: 'set_favorites_filter', payload: value })
    }
  }, [filtered, token])

  const totalPageCount = Math.ceil(pagination.total / pagination.size)

  const storeContext = useMemo(() => ({
    productList,
    favoritesList,
    userId,
    pagination,
    currentPageNumber,
    userPageSize,
    filtered,
    totalPageCount,
    loading,
    onPageChange,
    changeFilter,
    getFavorites
  }), [productList, favoritesList, userId, pagination, currentPageNumber, userPageSize, filtered, totalPageCount, loading, onPageChange, changeFilter, getFavorites])

  useEffect(() => {
    if (filtered === 0) {
      getStore()
    }
  }, [filtered, getStore])

  useEffect(() => {
    if (filtered === 1) {
      const productIds = favoritesList.join(',')
      getStore(productIds)
    }
  }, [filtered, favoritesList, getStore])

  useEffect(() => {
    if (token) {
      getFavorites()
    } else if (favoritesList.length > 0) {
      // Only clear favorites if there are any (user just logged out)
      storeDispatch({ type: 'set_favorites_list', payload: [] })
      // Auto-switch to All Products if viewing favorites
      if (filtered === 1) {
        storeDispatch({ type: 'set_favorites_filter', payload: 0 })
      }
    }
  }, [token, getFavorites, filtered, favoritesList.length])

  return (
    <StoreContext.Provider value={storeContext}>
      {children}
    </StoreContext.Provider>
  )
}