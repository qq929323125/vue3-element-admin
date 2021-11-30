<!--
 * @Author: your name
 * @Date: 2021-01-07 14:04:59
 * @LastEditTime: 2021-11-30 18:53:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\AppMain.vue
 *<el-scrollbar></el-scrollbar>
-->
<template>
    <el-container>
        <el-aside width="auto"><side-bar></side-bar></el-aside>
        <el-container>
            <el-header :height="nav_height">
                <navigate-bar></navigate-bar>
            </el-header>
            <el-main>
                <el-scrollbar
                    style="
                        padding: 20px;
                        box-sizing: border-box;
                        background: #fff;
                    "
                >
                    <router-view v-slot="{ Component }">
                        <transition name="el-zoom-in-top" mode="out-in">
                            <component :key="routerAlive" :is="Component" />
                        </transition>
                    </router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import { nav_height } from "@/styles/variables.scss.js";
import NavigateBar from "@/components/layout/NavigateBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import { provide, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const routerAlive = ref(null);
watchEffect(() => {
    routerAlive.value = route.name;
});
provide("reload", () => {
    routerAlive.value = Math.random() + "_" + Math.random();
});
</script>
<style lang="scss" scoped>
.el-main {
    height: calc(100vh - v-bind(nav_height));
    background: $main-bg-color;
    :deep(.el-scrollbar__bar.is-horizontal) {
        visibility: hidden;
    }
}
</style>
