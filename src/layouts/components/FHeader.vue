<script setup lang="ts">
import store from '../../store';

</script>

<template>
    <div class="Header">
        <span>@Yy</span>
        <el-icon>
            <Menu />
        </el-icon>
        <el-icon>
            <Refresh />
        </el-icon>
        <el-icon>
            <FullScreen />
        </el-icon>
        <el-dropdown>
            <span class="el-dropdown-link">
                用户:{{ store.state.user.username }}
                <el-avatar :size="50" :src="circleUrl" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>