<template>
    <div class="menu-box" :style="{width: store.state.asideWidth, height: 'calc(100vh - 60px)'}">
        <el-menu router :default-active="defaultActive" :collapse-transition="false" :collapse="store.state.isCollapse" :unique-opened="true" class="custom-menu" style="height: 100%;">
            <template v-for="(item, index) in asideMenus" :key="index">
                <!--目录-->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <!--页面(没有子页面)-->
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import store from '../../store';

const router = useRouter()

const defaultActive = ref(router.path)

const asideMenus = computed(() => store.state.menus)

//改为直接使用el-menu的router模式
// const handleSelect = (path) => {
//     const finalPath = path.startsWith('/') ? path : `/${path}`
//     router.push(finalPath)
// }

</script>

<style>
.menu-box {
    transition: all 0.3s ;
    overflow-y: auto;
    overflow-x: hidden;
}
.menu-box::-webkit-scrollbar {
    width: 0px;
}
</style>