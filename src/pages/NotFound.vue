<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <button @click="$router.push('/')">返回首页</button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding-top: 100px;
}
button {
  margin-top: 20px;
  padding: 8px 16px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
