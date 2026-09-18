<template>
  <div class="Header w-full flex items-center justify-between h-full px-4 bg-purple-500 text-light-50">
    <div class="flex items-center gap-3 ">
      <span class="font-bold">@Yy</span>
      <el-icon>
        <Menu />
      </el-icon>
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon @click="handleRefresh" class="cursor-pointer">
          <Refresh />
        </el-icon>
      </el-tooltip>
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon @click="handleFullscreen" class="cursor-pointer">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
    </div>

    <el-dropdown @command="handleCommand">
      <div class="flex items-center gap-2 cursor-pointer">
        <span class="text-light-50">用户: {{ store.state.user.username }}</span>
        <el-avatar :size="50" :src="$store.state.user.avatar" />
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logoutTo">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <!-- <el-drawer v-model="showDrawer" title="修改密码" :size="'45%'" :with-header="false" :close-on-click-modal="false">
    <span>修改密码</span>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="110px" style="width: 90%;" class="flex flex-col gap-4">
      <el-form-item prop="oldpassword" label="原密码">
        <el-input v-model="form.oldpassword" style="width: 70%" class="responsive-input flex-1"/>
      </el-form-item>
      <el-form-item prop="newpassword" label="新密码">
        <el-input v-model="form.password" type="password" style="width: 70%" class="responsive-input flex-1" show-password/>
      </el-form-item>
      <el-form-item prop="newpasswordrepeat" label="确认新密码">
        <el-input v-model="form.repassword" type="password" style="width: 70%" class="responsive-input flex-1" show-password/>
      </el-form-item>
      <div class="button-box flex">
      <el-button class="bg-purple-500 text-light-50" style="width: 70%" @click="onSubmit"
        :loading="loading">提交</el-button>
      <el-button class="bg-gray-100 text-black-50" style="width: 70%" @click="onCancel"
      :loading="loading">取消</el-button>
      </div>
    </el-form>
  </el-drawer> -->

  <FormDrawer ref="formDrawerRef" style="width: 100%; height: 100%;" class="bg-red-800" @click="open">

  </FormDrawer>

</template>

<script setup>
import store from '../../store';
import { showModal } from '../../composables/utils';
import { logout } from '../../api/manager';
import { toast } from '../../composables/utils';
import { useRouter } from 'vue-router';
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue';
import { updatepassword } from '../../api/manager';
import FormDrawer from '../../components/FormDrawer.vue';

const router = useRouter();
const { isFullscreen, toggle } = useFullscreen();
const showDrawer = ref(false);
const formDrawerRef = ref(null)

const handleCommand = (c) => {
  switch (c) {
    case "logoutTo":
      logoutTo();
      break;
    case "rePassword":
      rePassword();
      break;
  }
}

function logoutTo() {
  showModal("确定要退出登录?").then(() => {
    logout().finally(res => {
      store.dispatch("logout");
      //返回登录页
      router.push("/login");
      //提示退出登录成功
      toast("退出登录成功");
    })
  })
}

const handleRefresh = () => { location.reload(); }

const handleFullscreen = () => toggle();

function rePassword() {
  formDrawerRef.value.open();
}

const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
});

const rules = reactive({
    oldpassword: [
      { required: true, message: '原密码不能为空', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '新密码不能为空', trigger: 'blur' },
    ],
    repassword: [
      { required: true, message: '请再次输入新密码', trigger: 'blur' }
    ]
})

const formRef = ref(null);

const loading = ref(false);

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log("修改失败!");
            return;
        }
        else {
            if (form.password !== form.repassword) {
              toast('两次密码不一致','error');
              return;
            }
            loading.value == true;
            updatepassword({
              oldpassword: form.oldpassword,
              password: form.password,
              repassword: form.repassword
            }).then(()=>{
              toast('修改密码成功');
              store.dispatch("logout");
              router.push("/login");
            }).catch((error)=>{
              toast('修改密码失败','error');
              console.log("修改密码失败:", error);
            })
        }
    })
}

const onCancel = () => {
  showDrawer.value = false;
  form.oldpassword = '';
  form.newpassword = '';
  form.newpasswordrepeat = '';
  formRef.value?.clearValidate();
}

</script>