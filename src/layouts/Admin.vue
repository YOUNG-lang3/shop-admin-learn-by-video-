<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <SideMenu />
    </aside>
    <!-- 主内容区 -->
    <main class="main">
      <div class="header">动态路由 Demo - 后台布局</div>
      <!-- 子路由渲染在这里：动态加的 /goods、/category 都会渲染到这个 router-view -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
import SideMenu from '../components/SideMenu.vue'
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 200px;
  background: #304156;
  color: #fff;
}
.main {
  flex: 1;
  padding: 20px;
  background: #f0f2f5;
}
.header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}
</style>
