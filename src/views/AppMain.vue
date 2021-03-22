<!--
 * @Author: your name
 * @Date: 2021-01-07 14:04:59
 * @LastEditTime: 2021-03-19 09:12:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\main.vue
 *<el-scrollbar></el-scrollbar>
-->
<template>
    <el-container>
        <el-aside width="auto"><side-bar></side-bar></el-aside>
        <el-container>
            <el-header :height="nav_height"
                ><navigate-bar></navigate-bar
            ></el-header>
            <el-main :style="styles"
                ><el-scrollbar
                    style="padding:20px;box-sizing:border-box;background:#fff;"
                    ><router-view v-if="routerAlive" v-slot="{ Component }"
                        ><transition name="el-zoom-in-top" mode="out-in">
                            <component :is="Component" /> </transition
                    ></router-view> </el-scrollbar
            ></el-main>
        </el-container>
    </el-container>
</template>
<script>
import { nav_height } from "@/styles/variables.scss.js";
import NavigateBar from "@/components/layout/NavigateBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import { ref, provide, nextTick } from "vue";
export default {
    name: "AppMain",
    components: {
        NavigateBar,
        SideBar
    },
    // 获取用户相关信息和路由权限
    setup() {
        const styles = { "--nav_height": nav_height };
        const routerAlive = ref(true);
        provide("reload", () => {
            routerAlive.value = false;
            nextTick(() => {
                routerAlive.value = true;
            });
        });
        return { styles, nav_height, routerAlive };
    }
};
</script>
<style lang="scss" scoped>
.el-main {
    height: calc(100vh - var(--nav_height));
    background: $main-bg-color;
    :deep .el-scrollbar__bar.is-horizontal {
        visibility: hidden;
    }
}
</style>
