<template>
  <div class="common-layout w-full min-h-screen">
    <el-container class="w-full min-h-screen">
      <el-header class="!p-0"><FHeader /></el-header>
      <el-container>
        <el-aside :width="store.state.asideWidth">
          <FMenu />
        </el-aside>
        <el-main class="w-full">
            标签导航
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import store from '../store/index.js';
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';
</script>

<style>
.el-aside {
  transition: all 0.3s ;
}
</style>