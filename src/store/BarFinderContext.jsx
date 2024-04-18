import { createContext, useEffect, useReducer } from "react";
import findBars from "../interfaces/FindBars";

const initialState = {
  barlist: [],
  currentLocation: {},
  loading: true,
  initialSearchLoading: true,
  locationUnavailable: true,
  currentPage: 1,
  perPage: 4,
  handleSearch: () => { },
  previousPage: () => { },
  nextPage: () => { }
}

export const BarFinderContext = createContext(initialState)

function barFinderReducer(state, { type, payload, id }) {
  if (type === 'set_bars') {
    let newState
    if (id === 'reset') {
      newState = { ...state, barlist: payload, currentPage: 1, initialSearchLoading: false }
    } else {
      newState = { ...state, barlist: payload, initialSearchLoading: false }
    }
    return newState
  }
  if (type === 'set_location') {
    return { ...state, currentLocation: payload, locationUnavailable: false }
  }
  if (type === 'set_loading') {
    return { ...state, loading: payload }
  }
  if (type === 'prev_page') {
    return { ...state, currentPage: state.currentPage - 1 }
  }
  if (type === 'next_page') {
    return { ...state, currentPage: state.currentPage + 1 }
  }
  return state
}

export default function BarFinderContextProvider({ children }) {
  const [barFinderState, barFinderDispatch] = useReducer(barFinderReducer, initialState)
  const { barlist, currentLocation, loading, locationUnavailable, currentPage, perPage, initialSearchLoading } = barFinderState

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
    initialSearchLoading,
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