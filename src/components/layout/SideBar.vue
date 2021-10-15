<!--
 * @Author: your name
 * @Date: 2021-01-07 16:21:00
 * @LastEditTime: 2021-10-15 17:16:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\SideBar.vue
-->
<template>
    <router-link to="/">
        <logo />
    </router-link>
    <div class="ve_el_menu">
        <el-scrollbar>
            <el-menu
                :default-active="defaultActive"
                :collapse="opened"
                :collapseTransition="false"
                unique-opened
                :background-color="sideBgColor"
                :text-color="sideTextColor"
                :active-text-color="sideActiveTextColor"
            >
                <slide-menu
                    v-for="item in menus"
                    :key="item.id"
                    :menu="item"
                ></slide-menu>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {
    nav_height,
    sideBgColor,
    sideTextColor,
    sideActiveTextColor,
} from "@/styles/variables.scss.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Logo from "./components/Logo";
import SlideMenu from "./components/SlideMenu";

const store = useStore();
const route = useRoute();
const opened = computed(() => store.getters.opened);
const menus = computed(() => store.getters.menuList);
const defaultActive = computed(() => {
    let i = route.name.indexOf("/");
    if (i < 0) {
        return "/" + route.name;
    } else {
        return "/" + route.name.slice(0, i);
    }
});
</script>

<style lang="scss" scoped>
a:active {
    color: $base-color;
}
.ve_el_menu {
    background: $sideBgColor;
    height: calc(100vh - v-bind(nav_height));
}
</style>
