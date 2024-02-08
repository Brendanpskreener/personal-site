import axios from "axios";

export default async function setUserFavorite(userId, productId) {
  const baseURL = new URL(`https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/user/${userId}/favorite`)
  const config = {
    method: 'post',
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