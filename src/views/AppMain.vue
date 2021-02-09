<!--
 * @Author: your name
 * @Date: 2021-01-07 14:04:59
 * @LastEditTime: 2021-02-09 09:34:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\main.vue
 *<el-scrollbar></el-scrollbar>
-->
<template>
    <el-container>
        <el-aside width="auto"><side-bar></side-bar></el-aside>
        <el-container>
            <el-header :height="nav_height"><nav-bar></nav-bar></el-header>
            <el-main :style="styles"
                ><el-scrollbar
                    style="padding:20px;box-sizing:border-box;background:#fff"
                    ><router-view></router-view> </el-scrollbar
            ></el-main>
        </el-container>
    </el-container>
</template>
<script>
import { nav_height } from "@/styles/variables.scss.js";
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
        const styles = { "--nav_height": nav_height };
        return { styles, nav_height };
    }
};
</script>
<style lang="scss" scoped>
.el-main {
    height: calc(100vh - var(--nav_height));
    background: $main-bg-color;
}
</style>
