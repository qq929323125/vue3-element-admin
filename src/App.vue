<!--
 * @Author: your name
 * @Date: 2021-01-07 09:49:29
 * @LastEditTime: 2021-08-09 15:31:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\App.vue
-->
<template>
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default {
    components: {
        ElConfigProvider,
    },
    name: "App",
    data: () => ({
        locale: zhCn,
    }),
};
</script>
<style lang="scss" scoped></style>
