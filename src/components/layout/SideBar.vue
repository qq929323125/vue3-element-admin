<!--
 * @Author: your name
 * @Date: 2021-01-07 16:21:00
 * @LastEditTime: 2021-01-08 18:08:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\SideBar.vue
-->
<template>
    <div class="ve_side_bar">
        <logo />
        <el-menu default-active="" :collapse="opened">
            <slide-menu></slide-menu>
        </el-menu>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Logo from "./components/Logo";
import SlideMenu from "./components/SlideMenu";
export default {
    components: {
        Logo,
        SlideMenu
    },
    setup() {
        const store = useStore();
        const opened = computed(() => store.getters.opened);
        _api;
        console.log(
            "控制台打印--> ~ file: SideBar.vue ~ line 36 ~ setup ~ API",
            _api
        );
        return {
            opened
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped></style>
