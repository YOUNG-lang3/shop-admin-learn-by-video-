import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Admin from '../layouts/Admin.vue'
import Home from '../pages/Home.vue'
import NotFound from '../pages/NotFound.vue'
import Goods from '../pages/Goods.vue'
import Category from '../pages/Category.vue'
import Order from '../pages/Order.vue'

// ============================================================
// 第一部分：静态路由 —— 一开始就注册，不需要权限就能访问
// ============================================================
const routes = [
  {
    path: '/',
    redirect: '/login' // 根路径重定向到登录页
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin, // 后台布局（含侧边栏 + router-view）
    redirect: '/admin/home',
    children: [
      {
        path: 'home', // 子路由路径不带 /，最终路径是 /admin/home
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
      }
    ]
  },
  {
    // 404 兜底：所有不匹配的路径都走这里
    // 注意：必须放在静态路由里，不能等动态加，否则刷新未知路径白屏
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

// ============================================================
// 第二部分：动态路由表 —— 定义了但不注册，等登录后按权限添加
// ============================================================
// 关键点：组件是前端本地写死的，后端只返回"你有权限看哪些菜单"
// 后端返回的 frontpath 必须和这里的 path 完全一致，才能匹配上
export const asyncRoutes = [
  {
    path: '/goods',
    name: 'Goods',
    component: Goods,
    meta: { title: '商品管理' }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { title: '分类管理' }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: { title: '订单管理' }
  }
]

// 创建路由实例
export const router = createRouter({
  history: createWebHashHistory(), // hash 模式，URL 带 #，不需要后端配置
  routes
})

// ============================================================
// 第三部分：动态添加路由的核心函数
// ============================================================
// 参数 menus：后端返回的菜单树，结构如 [{ name, frontpath, child: [...] }]
// export function addRoutes(menus) {
//   let hasNewRoute = false // 标记：本次有没有加新路由

//   // 递归函数：遍历菜单树的每一层
//   const findAndAdd = (arr) => {
//     arr.forEach(menuItem => {
//       // 用菜单的 frontpath 去本地动态路由表里找匹配
//       const route = asyncRoutes.find(r => r.path === menuItem.frontpath)

//       // 找到了 && 还没注册过 → 动态添加
//       if (route && !router.hasRoute(route.name)) {
//         // 第一个参数 'Admin' 是父路由的 name
//         // 意思是：把这条路由作为 Admin 的子路由加进去
//         // 这样页面会渲染在 Admin 布局的 <router-view> 里，带着侧边栏
//         router.addRoute('Admin', route)
//         hasNewRoute = true
//       }

//       // 如果有子菜单，递归处理下一层
//       if (menuItem.child && menuItem.child.length) {
//         findAndAdd(menuItem.child)
//       }
//     })
//   }

//   findAndAdd(menus)
//   return hasNewRoute // 告诉调用方：加了新路由，需要重新匹配
// }

export function addRoutes(menus) {
  let hasNew = false
  const findAndAdd = (arr=[]) => {
    arr.forEach(menuItem => {
      const route = asyncRoutes.find(o => o.path === menuItem.frontpath)
      if(route && !router.hasRoute(route)) {
        router.addRoute('Admin', route)
        hasNew = true
      }
      if(menuItem.child && menuItem.child.length) {
        findAndAdd(menuItem.child)
      }
    })
  }
  findAndAdd(menus)
  return hasNew
}