<!--
 * @Author: your name
 * @Date: 2021-01-07 14:04:59
 * @LastEditTime: 2021-01-12 14:16:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\main.vue
-->
<template>
    <el-container>
        <el-aside width="auto"><side-bar></side-bar></el-aside>
        <el-container>
            <el-header><nav-bar></nav-bar></el-header>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";

export default {
    name: "AppMain",
    components: {
        NavBar,
        SideBar
    },
    // 获取用户相关信息和路由权限
    setup() {
        return {};
    }
};
</script>
<style lang="scss" scoped></style>
