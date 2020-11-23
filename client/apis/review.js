import fetchData from './services/fetch'
import { generateFetchOptions } from './services/helper'
import { REVIEW_API_PATH, GET, PATCH } from './constants'

// Get reviews by user id
const getReviewsByUser = (key) => {
  return fetchData(`${REVIEW_API_PATH}/${key}`, generateFetchOptions(GET))
}

// Update review by user id
// options: { content }
const updateReviewByUser = (key, options) => {
  return fetchData(
    `${REVIEW_API_PATH}/${key}`,
    generateFetchOptions(PATCH, {
      ...options,
    })
  )
}

export const REVIEW = {
  getReviewsByUser,
  updateReviewByUser,
}
