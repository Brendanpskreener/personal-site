import { createContext, useEffect, useReducer } from "react"
import { cognitoConfig } from "../config/cognito"
import decodeJWT from '../utils/decodeJWT'

const initialState = {
  token: null,
  userId: null,
  email: null,
  loading: true,
  setTokens: () => { },
  logout: () => { },
  redirectToLogin: () => { }
}

export const AuthContext = createContext(initialState)

function authReducer(state, { type, payload }) {
  switch (type) {
    case 'set_token':
      return { ...state, token: payload }
    case 'set_user_info':
      return { ...state, userId: payload.userId, email: payload.email }
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
  const { token, loading, userId, email } = authState

  function redirectToLogin() {
    const params = new URLSearchParams({
      client_id: cognitoConfig.clientId,
      response_type: 'code',
      scope: 'openid email aws.cognito.signin.user.admin',
      redirect_uri: cognitoConfig.redirectUri
    })

    const url = `${cognitoConfig.domain}/login?${params.toString()}`
    window.location.href = url
  }

  async function exchangeCodeForTokens(code) {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: cognitoConfig.clientId,
      code: code,
      redirect_uri: cognitoConfig.redirectUri
    })

    try {
      const response = await fetch(`${cognitoConfig.domain}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      })

      const data = await response.json()
      return data  // Contains access_token, refresh_token, id_token
    } catch (error) {
      console.error('Token exchange failed:', error)
      throw error
    }
  }

  function setTokens(accessToken, refreshToken, idToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('idToken', idToken)

    //Decode ID token to get user info
    const userInfo = decodeJWT(idToken)
    if (userInfo) {
      authDispatch({
        type: 'set_user_info', payload: {
          userId: userInfo.sub,
          email: userInfo.email
        }
      })
    }

    authDispatch({ type: 'set_token', payload: accessToken })
  }

  function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('idToken')
    authDispatch({ type: 'clear_token' })
    authDispatch({ type: 'set_user_info', payload: { userId: null, email: null } })
  }

  const authContext = {
    token,
    userId,
    email,
    loading,
    setTokens,
    logout,
    redirectToLogin
  }

  useEffect(() => {
    async function handleAuth() {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (code) {
        // OAuth callback flow
        try {
          const tokens = await exchangeCodeForTokens(code)
          setTokens(tokens.access_token, tokens.refresh_token, tokens.id_token)

          // Clean up URL (remove ?code=...)
          window.history.replaceState({}, document.title, window.location.pathname)
        } catch (error) {
          console.error('Auth failed:', error)
        }
      } else {
        // Normal page load - check localStorage
        const storedToken = localStorage.getItem('accessToken')
        const storedIdToken = localStorage.getItem('idToken')
        //Decode ID token if it exists
        if (storedIdToken) {
          const userInfo = decodeJWT(storedIdToken)
          if (userInfo) {
            authDispatch({
              type: 'set_user_info', payload: {
                userId: userInfo.sub,
                email: userInfo.email
              }
            })
          }
        }

        if (storedToken) {
          authDispatch({ type: 'set_token', payload: storedToken })
        }
      }

      authDispatch({ type: 'set_loading', payload: false })
    }

    handleAuth()
  }, [])

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}