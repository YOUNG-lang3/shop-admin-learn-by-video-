import { router } from "./router";
import { addRoutes } from "./router";
import { getToken, menuStore, removeToken } from "./store";
import { mockGetInfo } from "./mock/menu";

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  if (!token && to.path !== '/login') {
    return next('/login')
  }
  if (token && to.path === '/login') {
    return next('/admin/home')
  }
  if (token && !window.__menus__loaded) {
    try {
      const { menus } = await mockGetInfo()
      menuStore.SET_MENUS(menus)
      const hasNew = addRoutes(menus)
      window.__menus__loaded = true
      if (hasNew) {
        return next({ ...to, replace: true})
      }
    }catch(e) {
      removeToken()
      console.log('错误:', e.message)
      return next('/login')
    }
  }

  next()
})