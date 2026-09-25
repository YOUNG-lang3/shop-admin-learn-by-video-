<template>
  <div class="page">
    <h3>首页（静态路由 /admin/home）</h3>
    <p>这个页面是一开始就注册的静态路由。</p>
    <p>左边菜单里的"商品管理""分类管理"是登录后才动态添加的。</p>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { removeToken } from '../store'

const router = useRouter()
function logout() {
  removeToken()
  router.push('/login')
}
</script>

<style scoped>
.page {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
}
button {
  margin-top: 16px;
  padding: 8px 16px;
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
