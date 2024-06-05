import axios from "axios";

export default async function deleteUserFavorite({ userId, productId }) {
  const baseURL = new URL(`https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/user/${userId}/favorite`)
  const config = {
    method: 'delete',
    url: baseURL,
    data: {
      userId,
      productId
    }
  }
  try {
    const response = await axios(config)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}