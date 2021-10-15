<!--
 * @Author: your name
 * @Date: 2021-01-07 09:49:29
 * @LastEditTime: 2021-10-15 14:20:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\App.vue
-->
<template>
    <el-config-provider :locale="zhCn">
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>
<style lang="scss" scoped></style>
