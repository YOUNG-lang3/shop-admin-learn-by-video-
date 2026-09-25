import Login from "../pages/login.vue"
import About from "../pages/about.vue"
import NotFound from "../pages/404.vue"
import Admin from "../layouts/admin.vue"
import GoodList from "../pages/goods/list.vue"
import CategoryList from "../pages/category/list.vue"

import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

//初始静态路由
const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "登录页"
        }
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        redirect: "/admin/about",
        children: [
            {
                path: "about",
                name: "About",
                component: About,
                meta: {
                    title: "后台首页"
                }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: "404-Not Found"
        }
    }
]

//动态路由
const asyncRouter = [
    {
        path: "/goods/list",
        name: "Goodlist",
        component: GoodList,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: "/category/list",
        name: "Categorylist",
        component: CategoryList,
        meta: {
            title: "分类列表"
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

//动态添加路由
export function addRoutes(menus) {
    let hasNewRoute = false;
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRouter.find(o => o.path === e.frontpath)
            if (item && !router.hasRoute(item.name)) {
                router.addRoute("Admin", item)
                hasNewRoute = true
            }
            if (e.child && e.child.length) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }
    findAndAddRoutesByMenus(menus)

    return hasNewRoute
}