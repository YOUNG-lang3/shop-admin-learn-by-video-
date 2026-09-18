import router from "./router";
import { getToken } from "./composables/auth";
import { toast, showFullLoading, hideFullLoading } from "./composables/utils";
import store from "./store";
import About from "./pages/about.vue";

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //显示全局loading
    showFullLoading();

    const token = getToken();
    //没有登录强制返回
    if (!token && to.path !== '/login'){
        return next({path: "/login"});
    }
    //防止重复登录
    if (token && to.path === '/login'){
        toast("请勿重复登录", "error");
        return next({path: "/admin/about"});
    }
    //自动存储用户信息
    if (token) {
        await store.dispatch("getinfo");
    }

    //显示页面名称
    let title = to.meta.title ? (to.meta.title + "-hyy实践网") : "";
    document.title = title;

    next();
})

//全局后置守卫
router.afterEach((to, from) => hideFullLoading())