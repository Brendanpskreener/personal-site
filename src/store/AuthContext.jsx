import { createContext, useEffect, useReducer } from "react"

const initialState = {
  token: null,
  loading: true,
  login: () => { },
  logout: () => { }
}

export const AuthContext = createContext(initialState)

function authReducer(state, { type, payload }) {
  switch (type) {
    case 'set_token':
      return { ...state, token: payload }
    case 'clear_token':
      return { ...state, token: null }
    case 'set_loading':
      return { ...state, loading: payload }
    default:
      return state
  }
}

export default function AuthContextProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, initialState)
  const { token, loading } = authState

  function login(token) {
    localStorage.setItem('authToken', token)
    authDispatch({ type: 'set_token', payload: token })
  }

  function logout() {
    localStorage.removeItem('authToken')
    authDispatch({ type: 'clear_token' })
  }

  const authContext = {
    token,
    loading,
    login,
    logout
  }

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      authDispatch({ type: 'set_token', payload: localStorage.getItem('authToken') })
    }
    authDispatch({ type: 'set_loading', payload: false })
  }, [])

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}