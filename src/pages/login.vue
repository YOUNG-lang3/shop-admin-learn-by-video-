<template>

    <el-row>
        <el-col :lg="16" :md="12" class="min-h-screen bg-purple-500">
            <div class="flex flex-col justify-center items-center min-h-screen">
                <div class="text-light-300 text-8xl py-5">欢迎</div>
                <div class="w-2/3 flex items-center gap-3">
                    <!-- 左边横线 -->
                    <div class="h-px bg-gray-400 flex-1 px-6"></div>
                    <!-- 中间文字 -->
                    <span class="text-gray-400 text-base whitespace-nowrap">本站是未来AI全栈工程师+算法工程师的第一个vue3前端项目</span>
                    <!-- 右边横线 -->
                    <div class="h-px bg-gray-400 flex-1 px-6"></div>
                </div>
            </div>
        </el-col>

        <el-col :lg="8" :md="12" class="min-h-screen bg-light-50">
            <div class="flex flex-col justify-center items-center min-h-screen gap-3">
                <div class="text-black text-2xl">欢迎登录</div>
                <div class="w-full flex items-center" style="width: 200px">
                    <div class="h-px bg-gray-400 flex-1"></div>
                </div>
                <el-form ref="formRef" :model="form" :rules="rules" class="flex flex-col gap-4">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" style="width: 240px" class="responsive-input"
                            placeholder="请输入账号">
                            <template #prefix>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" type="password" style="width: 240px" class="responsive-input"
                            placeholder="请输入密码" show-password>
                            <template #prefix>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-button class="bg-purple-500 text-light-50" style="width: 240px" @click="onSubmit"
                        :loading="loading">登录</el-button>
                </el-form>
            </div>
        </el-col>
    </el-row>

</template>

<script setup>

import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
import store from '../store';

const form = reactive({
    username: '',
    password: ''
});

const rules = reactive({
    username: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
})

const formRef = ref(null);
const router = useRouter();
const loading = ref(false);

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log("登录失败!");
        }
        else {
            console.log("登录成功!");
            loading.value = true;
            store.dispatch("login", {
                username:form.username, 
                password:form.password
            }).then(()=>{
                router.push("/admin/about");
            }).catch(()=>{
                loading.value = false;
            }).finally(()=>{
                loading.value = false;
            });
        }
    })
}

//添加键盘回车
function onKeyUp(e) {
    if (e.key === "Enter") onSubmit();
};
onMounted(()=>{
    document.addEventListener("keyup", onKeyUp);
});
onBeforeUnmount(()=>{
    document.removeEventListener("keyup", onKeyUp);
});

</script>
