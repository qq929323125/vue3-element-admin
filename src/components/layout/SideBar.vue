<!--
 * @Author: your name
 * @Date: 2021-01-07 16:21:00
 * @LastEditTime: 2021-02-07 10:09:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\SideBar.vue
-->
<template>
    <router-link to="/">
        <logo />
    </router-link>
    <div class="ve_el_menu" :style="styles">
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

<script>
import {
    nav_height,
    sideBgColor,
    sideTextColor,
    sideActiveTextColor
} from "@/styles/variables.scss.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Logo from "./components/Logo";
import SlideMenu from "./components/SlideMenu";
export default {
    components: {
        Logo,
        SlideMenu
    },
    setup() {
        const styles = { "--nav_height": nav_height };
        const store = useStore();
        const route = useRoute();
        const opened = computed(() => store.getters.opened);
        const menus = computed(() => store.getters.menuList);
        const defaultActive = computed(() => {
            return route.path;
        });

        return {
            sideBgColor,
            sideTextColor,
            sideActiveTextColor,
            styles,
            opened,
            menus,
            defaultActive,
            nav_height
        };
    }
};
</script>

<style lang="scss" scoped>
a:active {
    color: $base-color;
}
.ve_el_menu {
    background: $sideBgColor;
    height: calc(100vh - var(--nav_height));
}
</style>
