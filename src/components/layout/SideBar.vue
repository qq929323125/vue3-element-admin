<!--
 * @Author: your name
 * @Date: 2021-01-07 16:21:00
 * @LastEditTime: 2021-01-15 11:10:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\SideBar.vue
-->
<template>
    <logo />
    <div class="ve_el_menu">
        <el-scrollbar>
            <el-menu
                :default-active="defaultActive"
                :collapse="opened"
                :collapseTransition="false"
                unique-opened
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
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
        const store = useStore();
        const route = useRoute();
        const opened = computed(() => store.getters.opened);
        const menus = computed(() => store.getters.menuList);
        const defaultActive = computed(() => {
            return route.path;
        });

        return {
            opened,
            menus,
            defaultActive
        };
    },
    methods: {}
};
</script>

<style lang="scss">
.ve_el_menu {
    height: calc(100vh - 60px);
}
</style>
