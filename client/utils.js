export const isAdmin = (user = {}) => {
  return Object.keys(user).length > 0 && user.role === 'admin'
}

export const isLogin = (user = {}) => {
  return Object.keys(user).length > 0
}

export const isEmptyString = (str) => {
  return str === '' || str === null
}

export const isEmptyArray = (arr) => {
  return arr.length === 0
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0
}
