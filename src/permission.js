import { router, addRoutes } from './router'
import { getToken, setToken, removeToken } from './store'
import { mockGetInfo } from './mock/menu'

// ============================================================
// 全局前置守卫：每次路由跳转前都会执行
// 这是动态路由的触发点
// ============================================================
router.beforeEach(async (to, from, next) => {
  const token = getToken()

  // 规则1：没登录，且目标不是登录页 → 强制跳登录
  if (!token && to.path !== '/login') {
    return next('/login')
  }

  // 规则2：已登录，还想去登录页 → 不让去，直接进后台
  if (token && to.path === '/login') {
    return next('/admin/home')
  }

  // 规则3：已登录，但菜单还没加载 → 拉用户信息 + 动态加路由
  if (token && !window.__menus_loaded) {
    try {
      // 模拟请求后端接口，拿到菜单数据
      const { menus } = await mockGetInfo()

      // 按菜单权限动态注册路由
      const hasNewRoute = addRoutes(menus)

      // 标记菜单已加载，避免每次导航都重复请求
      window.__menus_loaded = true

      // 关键！加了新路由必须重新匹配一次
      // 因为本次导航的匹配结果在路由加入前就已经算完了
      // 不重走一次会直接落到 404
      if (hasNewRoute) {
        return next({ ...to, replace: true })
      }
    } catch (e) {
      // 拉取失败（比如 token 过期）→ 清 token，回登录页
      removeToken()
      return next('/login')
    }
  }

  // 正常放行
  next()
})
