import { createContext, useEffect, useReducer } from "react";
import findBars from "../interfaces/FindBars";

const initialState = {
  barlist: [],
  currentLocation: {},
  loading: true,
  locationUnavailable: true,
  currentPage: 1,
  perPage: 4,
  handleSearch: () => { },
  previousPage: () => { },
  nextPage: () => { }
}

export const BarFinderContext = createContext(initialState)

function barFinderReducer(state, { type, payload }) {
  if (type === 'get_bars') {
    return { ...state, barlist: payload, currentPage: 1 }
  }
  if (type === 'get_location') {
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
  if (type === 'turn_page') {
    return { ...state, barlist: payload }
  }
  return state
}

export default function BarFinderContextProvider({ children }) {
  const [barFinderState, barFinderDispatch] = useReducer(barFinderReducer, initialState)
  const { barlist, currentLocation, loading, locationUnavailable, currentPage, perPage } = barFinderState

  async function getLocation() {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    try {
      const { coords: { latitude, longitude } } = await promise
      barFinderDispatch({ type: 'get_location', payload: { latitude, longitude } })
    } catch (error) {
      console.warn(error)
    } finally {
      barFinderDispatch({ type: 'set_loading', payload: false })
    }
  }

  async function handleSearch(query) {
    try {
      const bars = await findBars({ ...query, ...currentLocation, perPage })
      barFinderDispatch({ type: 'get_bars', payload: bars })
    } catch (error) {
      console.warn(error)
    }
  }

  //I dont like this redundancy. pass a second argument to the function and then pass that as a flag to the dispatch. put a nested if check in the reducer to catch the flag and update state accordingly

  async function handlePageTurn(query) {
    try {
      const bars = await findBars({ ...query, ...currentLocation, perPage })
      barFinderDispatch({ type: 'turn_page', payload: bars })
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
    locationUnavailable,
    currentPage,
    perPage,
    handleSearch,
    previousPage,
    nextPage,
    handlePageTurn
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