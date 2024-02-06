import axios from "axios";

export default async function findProducts(args = {}) {
  const { from, size, userId } = args
  let baseURL = new URL('https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/product')
  if (userId) {
    baseURL = new URL(`https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/user/${userId}/favorite`)
  }

  if (from) {
    baseURL.searchParams.append("from", from)
  }

  if (size) {
    baseURL.searchParams.append("size", size)
  }

  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    console.error(error)
  }
}