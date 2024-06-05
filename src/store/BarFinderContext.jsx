import { createContext, useEffect, useReducer } from "react";
import findBars from "../interfaces/findBars";

const initialState = {
  barlist: [],
  currentLocation: {},
  loading: true,
  searchLoading: true,
  locationUnavailable: true,
  currentPage: 1,
  perPage: 4,
  handleSearch: () => { },
  previousPage: () => { },
  nextPage: () => { }
}

export const BarFinderContext = createContext(initialState)

function barFinderReducer(state, { type, payload, id }) {
  switch (type) {
    case 'set_bars':
      let newState
      if (id === 'reset') {
        newState = { ...state, barlist: payload, currentPage: 1, searchLoading: false }
      } else {
        newState = { ...state, barlist: payload, searchLoading: false }
      }
      return newState
    case 'set_search_loading':
      return { ...state, searchLoading: true }
    case 'set_location':
      return { ...state, currentLocation: payload, locationUnavailable: false }
    case 'set_loading':
      return { ...state, loading: payload }
    case 'prev_page':
      return { ...state, currentPage: state.currentPage - 1 }
    case 'next_page':
      return { ...state, currentPage: state.currentPage + 1 }
    default:
      return state
  }
}

export default function BarFinderContextProvider({ children }) {
  const [barFinderState, barFinderDispatch] = useReducer(barFinderReducer, initialState)
  const { barlist, currentLocation, loading, locationUnavailable, currentPage, perPage, searchLoading } = barFinderState

  async function getLocation() {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    try {
      const { coords: { latitude, longitude } } = await promise
      barFinderDispatch({ type: 'set_location', payload: { latitude, longitude } })
    } catch (error) {
      console.warn(error)
    } finally {
      barFinderDispatch({ type: 'set_loading', payload: false })
    }
  }

  async function handleSearch(query, id) {
    try {
      barFinderDispatch({ type: 'set_search_loading' })
      const bars = await findBars({ ...query, ...currentLocation, perPage })
      barFinderDispatch({ type: 'set_bars', payload: bars, id })
    } catch (error) {
      console.warn(error)
    }
  }

  function previousPage() {
    if (currentPage !== 1) {
      barFinderDispatch({ type: 'prev_page' })
    }
  }

  function nextPage() {
    barFinderDispatch({ type: 'next_page' })
  }

  const barFinderContext = {
    barlist,
    currentLocation,
    loading,
    searchLoading,
    locationUnavailable,
    currentPage,
    perPage,
    handleSearch,
    previousPage,
    nextPage,
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <BarFinderContext.Provider value={barFinderContext}>
      {children}
    </BarFinderContext.Provider>
  )
}