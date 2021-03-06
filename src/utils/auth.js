import Cookies from 'js-cookie'

const TokenKey = 'a-oken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 2, path: '/' })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
