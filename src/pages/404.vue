<template>
    <el-result icon="error" title="404" sub-title="没有找到相关页面">
        <template #extra>
            <el-button type="primary" @click="$router.push('/')">返回</el-button>
        </template>
    </el-result>
</template>