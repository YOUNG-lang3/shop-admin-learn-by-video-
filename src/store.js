// ============================================================
// 极简状态管理 —— 不用 Vuex，用 localStorage + 简单函数
// 真实项目里这里是 Vuex/Pinia，这里简化了，聚焦路由本身
// ============================================================

const TOKEN_KEY = 'demo-token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  window.__menus_loaded = false // 退出时重置菜单加载标记
}

// 菜单数据存在全局变量里（真实项目存在 Vuex/Pinia）
export const menuStore = {
  menus: [],
  setMenus(menus) {
    this.menus = menus
  }
}
