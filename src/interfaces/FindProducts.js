import axios from "axios";

export default async function findProducts(args = {}) {
  const { from, size } = args
  const baseURL = new URL('https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/product')

  if (from) {
    baseURL.searchParams.append("from", from)
  }

  if (size) {
    baseURL.searchParams.append("size", size)
  }
  const response = await axios.get(baseURL)
  return response.data
}