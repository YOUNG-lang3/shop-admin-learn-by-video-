// ============================================================
// 模拟后端接口 —— 真实项目里这里是 axios 请求
// ============================================================

// 模拟：登录后后端返回的菜单数据
// frontpath 必须和 router/index.js 里 asyncRoutes 的 path 一致
const mockMenus = [
  {
    name: '首页',
    frontpath: '/admin/home', // 这个是静态路由，不在 asyncRoutes 里，所以不会被动态添加
    icon: 'home'
  },
  {
    name: '商品管理',
    frontpath: '/goods', // 和 asyncRoutes 里的 path 匹配 → 会被动态添加
    icon: 'goods'
  },
  {
    name: '分类管理',
    frontpath: '/category', // 和 asyncRoutes 里的 path 匹配 → 会被动态添加
    icon: 'category'
  },
  {
    name: '订单管理',
    frontpath: '/order',
    icon: 'order'
  }
]

// 模拟 getinfo 接口：延迟 300ms 返回菜单
export function mockGetInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ menus: mockMenus })
    }, 300)
  })
}

// 模拟登录接口
export function mockLogin(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        resolve({ token: 'mock-token-' + Date.now() })
      } else {
        reject(new Error('账号密码不能为空'))
      }
    }, 300)
  })
}
