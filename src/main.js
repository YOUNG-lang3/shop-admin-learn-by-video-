import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import './permission.js' // 导入即生效：注册全局路由守卫

const app = createApp(App)
app.use(router) // 挂载路由，这一步不能少，否则 <router-view> 不工作
app.mount('#app')
