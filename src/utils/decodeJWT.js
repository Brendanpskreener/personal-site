export default function decodeJWT(token) {
  try {
    //Split the token into its parts
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }

    // Get the payload
    const base64Url = parts[1]
    //Convert to base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    // Decode base64 to JSON string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(character => '%' + ('00' + character.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    //Parse JSON
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}