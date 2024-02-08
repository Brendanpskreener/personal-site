import axios from "axios";

export default async function findFavorites(userId) {
  const baseURL = new URL(`https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/user/${userId}/favorite`)

  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    console.error(error)
  }
}