export const getLocalToken = function () {
  return localStorage.getItem('token')
}

export const setLocalToken = function (token) {
  localStorage.setItem('token', token)
}

export const removeLocalToken = function (token) {
  localStorage.removeItem('token')
}
