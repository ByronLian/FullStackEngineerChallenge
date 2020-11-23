// This file is client side helper method for calling API
export const generateFetchOptions = (method, body = {}) => {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method,
  }

  if (method !== 'GET') options.body = JSON.stringify(body)
  return options
}

export const baseApiUrl = 'http://localhost:8888/api/'
