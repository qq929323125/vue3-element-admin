<!--
 * @Author: your name
 * @Date: 2021-01-07 14:04:59
 * @LastEditTime: 2021-03-26 09:48:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\AppMain.vue
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
                    ><router-view v-slot="{ Component }"
                        ><transition name="el-zoom-in-top" mode="out-in">
                            <component
                                :key="routerAlive"
                                :is="Component"
                            /> </transition
                    ></router-view> </el-scrollbar
            ></el-main>
        </el-container>
    </el-container>
</template>
<script>
import { nav_height } from "@/styles/variables.scss.js";
import NavigateBar from "@/components/layout/NavigateBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import { provide, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
export default {
    name: "AppMain",
    components: {
        NavigateBar,
        SideBar
    },
    // 获取用户相关信息和路由权限
    setup() {
        const route = useRoute();
        const styles = { "--nav_height": nav_height };
        const routerAlive = ref(null);
        watchEffect(() => {
            routerAlive.value = route.name;
        });
        provide("reload", () => {
            routerAlive.value = Math.random() + "_" + Math.random();
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
