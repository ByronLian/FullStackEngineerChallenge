// This is fetch function for client side API calling
import { baseApiUrl } from './helper'

const fetchData = async (url, options) => {
  const res = await fetch(baseApiUrl + url, options)

  if (res.ok) {
    const { data } = await res.json()
    return data
  }
  throw res
}

export default fetchData
