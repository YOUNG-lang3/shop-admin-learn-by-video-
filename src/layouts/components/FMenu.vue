<template>
    <div class="menu-box" style="width: 250px; height: calc(100vh - 60px);">
        <el-menu default-active="2" class="custom-menu" style="height: 100%;">
            <template v-for="(item, index) in asideMenus" :key="index">
                <!--目录-->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath" @click="handleSelect(item2.frontpath)">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <!--页面(没有子页面)-->
                <el-menu-item v-else :index="item.frontpath" @click="handleSelect(item.frontpath)">
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
const router = useRouter()

const asideMenus = [
    {
        "name": "后台面板",
        "icon": "help",
        "child": [
            {
                "name": "主控台",
                "icon": "home-filled",
                "frontpath": "/"
            }
        ]
    },
    {
        "name": "商城管理",
        "icon": "shoppingBag",
        "child": [
            {
                "name": "商品管理",
                "icon": "shoppingCart",
                "frontpath": "/goods/list"
            }
        ]
    }
]

const handleSelect = (e) => {
    router.push(e)
}

</script>