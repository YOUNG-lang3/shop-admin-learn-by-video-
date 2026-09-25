<template>
  <div class="login-box">
    <h2>登录页（静态路由，不需要权限）</h2>
    <input v-model="username" placeholder="账号" />
    <input v-model="password" type="password" placeholder="密码" />
    <button @click="onLogin" :disabled="loading">
      {{ loading ? '登录中...' : '登录' }}
    </button>
    <p class="tip">输入任意账号密码即可登录（模拟后端）</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setToken } from '../store'
import { mockLogin } from '../mock/menu'

const router = useRouter()
const username = ref('admin')
const password = ref('123456')
const loading = ref(false)

async function onLogin() {
  loading.value = true
  try {
    const res = await mockLogin(username.value, password.value)
    setToken(res.token)       // 存 token
    router.push('/admin/home') // 跳后台首页，守卫会自动拉菜单+加路由
  } catch (e) {
    alert(e.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-box {
  max-width: 300px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  padding: 10px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
}
.tip {
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>
