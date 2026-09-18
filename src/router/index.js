import Login from "../pages/login.vue"
import About from "../pages/about.vue"
import NotFound from "../pages/404.vue"
import Admin from "../layouts/admin.vue"

import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

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
        children : [
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

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router