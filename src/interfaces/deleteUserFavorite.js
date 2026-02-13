import apiWithAuth from "../utils/apiWithAuth"

export default async function deleteUserFavorite({ userId, productId, token }) {
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
    const response = await apiWithAuth(config, token)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}