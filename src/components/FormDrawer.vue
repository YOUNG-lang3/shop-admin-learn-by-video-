<template>
    <el-drawer v-model="showDrawer" title="ÐÞ¸ÄÃÜÂë" :size="'45%'" :with-header="false" :close-on-click-modal="false">
        
    </el-drawer>

</template>

<script setup>
import { ref } from 'vue';

const showDrawer = ref(false);

const open = () => {showDrawer.value = true}
const close = () => {showDrawer.value = false}

defineExpose({open, close})

</script>