import fetchData from './services/fetch'
import { generateFetchOptions } from './services/helper'
import { USER_API_PATH, GET, POST, PATCH } from './constants'

// Get all users
const getUsers = () => {
  return fetchData(USER_API_PATH, generateFetchOptions(GET))
}

// Add new user
const addNewUser = (options) => {
  return fetchData(
    USER_API_PATH,
    generateFetchOptions(POST, {
      ...options,
    })
  )
}

// Update user by user id
const updateUserById = (key, options) => {
  return fetchData(
    `${USER_API_PATH}/${key}`,
    generateFetchOptions(PATCH, {
      ...options,
    })
  )
}

export const USER = {
  getUsers,
  addNewUser,
  updateUserById,
}
