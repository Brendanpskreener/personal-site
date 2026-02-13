import apiWithAuth from '../utils/apiWithAuth'

export default async function findFavorites(userId, token) {
  const baseURL = new URL(`https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/user/${userId}/favorite`)
  const config = {
    method: 'get',
    url: baseURL
  }

  try {
    const response = await apiWithAuth(config, token)
    return response.data
  } catch (error) {
    console.error(error)
  }
}