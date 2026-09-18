<template>
    <div>About:{{ $store.state.user.username }}</div>

    <el-button @click="logoutTo">退出登录</el-button>
</template>

<script setup>
import { showModal } from '../composables/utils';
import { logout } from '../api/manager';
import { toast } from '../composables/utils';
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();
function logoutTo() {
    showModal("确定要退出登录?").then(()=>{
        logout().finally(res=>{
            store.dispatch("logout");
            //返回登录页
            router.push("/login");
            //提示退出登录成功
            toast("退出登录成功");
        })
    })
}

</script>