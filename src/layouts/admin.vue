<template>
  <div class="common-layout">
    <el-container>
      <el-header><FHeader /></el-header>
      <el-container>
        <el-aside>侧栏</el-aside>
        <el-main>
            标签导航
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
    import FHeader from './components/FHeader.vue';
    import FMenu from './components/FMenu.vue';
    import FTagList from './components/FTagList.vue';
</script>