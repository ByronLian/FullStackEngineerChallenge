import fetchData from './services/fetch'
import { generateFetchOptions } from './services/helper'
import { REVIEW_API_PATH, REVIEW_PERIODS_API_PATH, REVIEW_ALL_API_PATH, GET, PATCH } from './constants'

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

// Get all Performance Periods
const getPerformancePeriods = () => {
  return fetchData(REVIEW_PERIODS_API_PATH, generateFetchOptions(GET))
}

// Get all reviews base on Performance Period
const getPerformancePeriodById = (key) => {
  return fetchData(`${REVIEW_ALL_API_PATH}/${key}`, generateFetchOptions(GET))
}

export const REVIEW = {
  getReviewsByUser,
  updateReviewByUser,
  getPerformancePeriods,
  getPerformancePeriodById,
}
