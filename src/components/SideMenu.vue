<template>
  <div class="menu">
    <div class="menu-title">菜单</div>
    <!--
      用原生 <div> 模拟菜单点击，核心逻辑和 el-menu 的 router 模式一样：
      点击时 router.push(frontpath)
      default-active 用当前 route.path 高亮
    -->
    <div
      v-for="item in menus"
      :key="item.frontpath"
      class="menu-item"
      :class="{ active: route.path === item.frontpath }"
      @click="router.push(item.frontpath)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuStore } from '../store'
import { mockGetInfo } from '../mock/menu'

const route = useRoute()   // 当前路由信息，route.path 是当前路径
const router = useRouter() // 路由实例，用来 push 跳转

// 菜单数据：permission.js 里已经通过 mockGetInfo 拉过了
// 这里再确保一下有数据（真实项目从 Vuex/Pinia 取）
const menus = computed(() => {
  if (!menuStore.menus.length) {
    mockGetInfo().then(res => menuStore.setMenus(res.menus))
  }
  return menuStore.menus
})
</script>

<style scoped>
.menu {
  padding: 16px 0;
}
.menu-title {
  padding: 0 16px 12px;
  font-size: 14px;
  color: #909399;
  border-bottom: 1px solid #3d4d66;
}
.menu-item {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.menu-item:hover {
  background: #263445;
}
.menu-item.active {
  background: #409eff;
  color: #fff;
}
</style>
