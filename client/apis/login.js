import fetchData from './services/fetch'
import { generateFetchOptions } from './services/helper'
import { LOGIN_API_PATH, POST } from './constants'

// Login
// options: { email, password }
export const LOGIN = (options) => {
  return fetchData(
    LOGIN_API_PATH,
    generateFetchOptions(POST, {
      ...options,
    })
  )
}
