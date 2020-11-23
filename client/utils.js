export const isAdmin = (user) => {
  return Object.keys(user).length > 0 && user.role === 'admin'
}

export const isLogin = (user) => {
  return Object.keys(user).length > 0
}

export const isEmptyString = (str) => {
  return str === '' || str === null
}
