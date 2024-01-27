import axios from "axios"

export default async function findImage(productId) {
  const baseURL = new URL(`https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/product/${productId}/image`)

  const response = await axios.get(baseURL, { responseType: 'arraybuffer' })

  return response.data
}