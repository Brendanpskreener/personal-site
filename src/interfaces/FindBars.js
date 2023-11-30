import axios from 'axios'

export default async function findBars(args) {
  const { name, zipcode, page, locationToggle, latitude, longitude } = args
  const baseURL = new URL('https://api.openbrewerydb.org/v1/breweries')
  const perPage = 4
  baseURL.searchParams.append("page", page)
  baseURL.searchParams.append("per_page", perPage)

  try {
    if (locationToggle && latitude) {
      const query = `${latitude},${longitude}`
      baseURL.searchParams.append("by_dist", query)
    } else if (!locationToggle && zipcode) {
      baseURL.searchParams.append("by_postal", zipcode)
    }
    if (name) {
      baseURL.searchParams.append("by_name", name)
    }
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    console.warn(error)
  }
}