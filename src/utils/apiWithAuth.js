import axios from 'axios'

export default async function apiWithAuth(config, token) {
  if (!token) {
    throw new Error('you must have a token to use this function!')
  }
  const response = await axios({
    ...config,
    headers: {
      ...config.headers,  // existing headers
      Authorization: `Bearer ${token}`  // your new header
    }
  })
  return response
}



