import { LOGIN_SUCCESS, LOGOUT, LOCAL_STORAGE_KEY } from './constants'

// If localStorage has user data means we still in login
const user = localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : {}

export const initialState = {
  user,
}

export const authReducer = (initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        user: action.payload,
      }
    case LOGOUT:
      return {
        ...initialState,
        user: {},
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
