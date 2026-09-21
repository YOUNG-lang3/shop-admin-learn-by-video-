<template>
  <el-drawer
    :model-value="modelValue"
    :title="title"
    :size="size"
    :with-header="withHeader"
    :close-on-click-modal="closeOnClickModal"
    :destroy-on-close="destroyOnClose"
    :show-close="showClose"
    @update:modelValue="handleUpdate"
    @close="handleClose"
  >
    <div class="drawer-content">
      <slot />
    </div>

    <template #footer v-if="showFooter || $slots.footer">
      <slot name="footer">
        <div class="drawer-footer flex">
          <el-button class="bg-gray-300 text-light-50" style="width: 70%" @click="handleCancel">{{ cancelText }}</el-button>
          <el-button type="primary" class="bg-purple-500 text-light-50" style="width: 70%" @click="handleConfirm" :loading="confirmLoading">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-drawer>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '提示'
  },
  size: {
    type: [Number, String],
    default: '45%'
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'close',
  'confirm',
  'cancel'
])

const handleUpdate = (value) => {
  emit('update:modelValue', value)
}

const handleClose = () => {
  emit('close')
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.drawer-content {
  padding: 20px 0;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>