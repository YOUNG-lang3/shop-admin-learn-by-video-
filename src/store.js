const TOKEN_KEY = 'demo_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  window.__menus__loaded = false
  localStorage.removeItem(TOKEN_KEY)
}

export const menuStore = {
  menus: [],
  SET_MENUS(menus) {
    this.menus = menus
  }
}