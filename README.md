# 动态路由最小 Demo

剥离了商城业务，只保留动态路由的核心链路，用来复习和手写练习。

## 运行方式

```bash
cd router-demo
npm install
npm run dev
```

浏览器打开 http://localhost:5174

## 验证步骤（按顺序操作，观察每一步发生了什么）

1. **打开页面** → 自动跳到 `#/login`（守卫：没 token 强制跳登录）
2. **输入任意账号密码登录** → 跳 `#/admin/home`，左侧出现菜单
3. **点击"商品管理"** → 地址栏变 `#/goods`，页面切换，菜单高亮跟随
4. **点击"分类管理"** → 地址栏变 `#/category`
5. **按 F5 刷新 `/goods` 页面** → 仍然正常显示（守卫重新拉菜单+加路由+`next({...to})` 重匹配）
6. **地址栏输入 `#/xxx`** → 显示 404
7. **点击退出登录** → 回登录页，此时直接访问 `#/goods` 会被踢回登录

## 动手练习（关掉注释，自己重写）

1. 在 `src/router/index.js` 里加一条新的动态路由（比如 `/order` 订单页）
2. 在 `src/mock/menu.js` 里加对应的菜单项
3. 在 `src/pages/` 下新建 Order.vue
4. 刷新页面，看菜单里会不会出现"订单管理"，点了能不能跳转
5. 把 `mock/menu.js` 里某条菜单删掉，刷新后对应路由还能不能访问？（不能，因为没被动态注册）

## 核心文件对照

| 文件 | 作用 | 对应商城项目 |
|---|---|---|
| `src/router/index.js` | 静态路由 + 动态路由表 + addRoutes 函数 | `src/router/index.js` |
| `src/permission.js` | 全局守卫：登录校验 + 触发动态加路由 | `src/permission.js` |
| `src/store.js` | token 和菜单存储（简化版） | `src/store/index.js` |
| `src/mock/menu.js` | 模拟后端接口 | `src/api/manager.js` |
| `src/components/SideMenu.vue` | 侧边栏菜单，点击跳转 | `src/layouts/components/FMenu.vue` |
| `src/layouts/Admin.vue` | 后台布局，含 router-view | `src/layouts/admin.vue` |

## 最容易忘的 3 个点

1. `router.addRoute("Admin", item)` —— 必须传父路由 name，否则页面脱离布局
2. 加完路由要 `next({ ...to, replace: true })` —— 不重新匹配会进 404
3. `asyncRoutes` 的 path 必须和后端菜单的 `frontpath` 完全一致 —— 对不上就加不上
