<template>
  <div class="page">
    <h3>商品管理（动态路由 /goods）</h3>
    <p>这个页面在登录前是不存在的！</p>
    <p>登录后守卫调用 addRoutes，根据后端菜单动态注册了这条路由。</p>
    <p>你可以在浏览器地址栏直接访问 #/goods 验证：未登录时会被踢回登录页。</p>
  </div>
</template>

<style scoped>
.page {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
}
</style>
