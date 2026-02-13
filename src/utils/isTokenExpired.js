import decodeJWT from './decodeJWT'

export default function isTokenExpired(token) {
  if (!token) return true

  try {
    const decoded = decodeJWT(token)
    if (!decoded?.exp) return true

    // exp is in seconds, Date.now() is in milliseconds
    const expirationTime = decoded.exp * 1000

    // Add 5 minute buffer (refresh 5 min before actual expiration)
    const bufferTime = 5 * 60 * 1000

    return Date.now() >= (expirationTime - bufferTime)
  } catch (error) {
    return true  // If we can't decode it, consider it expired
  }
}