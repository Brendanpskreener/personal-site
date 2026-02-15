import { createContext, useEffect, useReducer, useCallback, useMemo } from "react"
import { cognitoConfig } from "../config/cognito"
import decodeJWT from '../utils/decodeJWT'
import isTokenExpired from '../utils/isTokenExpired'

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

  const redirectToLogin = useCallback(() => {
    const params = new URLSearchParams({
      client_id: cognitoConfig.clientId,
      response_type: 'code',
      scope: 'openid email aws.cognito.signin.user.admin',
      redirect_uri: `${window.location.origin}${window.location.pathname}`  // Redirect back to current page
    })

    const url = `${cognitoConfig.domain}/login?${params.toString()}`
    window.location.href = url
  }, [])

  const exchangeCodeForTokens = useCallback(async (code) => {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: cognitoConfig.clientId,
      code: code,
      redirect_uri: `${window.location.origin}${window.location.pathname}`  // Must match the redirectUri used in login
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
  }, [])

  const setTokens = useCallback((accessToken, refreshToken, idToken) => {
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
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('idToken')
    authDispatch({ type: 'clear_token' })
    authDispatch({ type: 'set_user_info', payload: { userId: null, email: null } })
  }, [])

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: cognitoConfig.clientId,
      refresh_token: refreshToken
    })

    try {
      const response = await fetch(`${cognitoConfig.domain}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()
      // Refresh returns new access_token and id_token, but NOT a new refresh_token
      setTokens(data.access_token, refreshToken, data.id_token)
      return data.access_token
    } catch (error) {
      console.error('Token refresh failed:', error)
      // Refresh failed - log user out
      logout()
      throw error
    }
  }, [setTokens, logout])

  const getValidToken = useCallback(async () => {
    const localToken = localStorage.getItem('accessToken')
    if (isTokenExpired(localToken)) {
      // Token expired, refresh it
      return await refreshAccessToken()
    }

    if (localToken !== token) {
      authDispatch({ type: 'set_token', payload: localToken })
    }

    // Token still valid
    return localToken
  }, [token, refreshAccessToken])

  const authContext = useMemo(() => ({
    token,
    userId,
    email,
    loading,
    setTokens,
    logout,
    redirectToLogin,
    getValidToken
  }), [token, userId, email, loading, setTokens, logout, redirectToLogin, getValidToken])

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