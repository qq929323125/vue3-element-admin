<!--
 * @Author: your name
 * @Date: 2021-01-07 16:21:00
 * @LastEditTime: 2021-01-11 18:01:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\SideBar.vue
-->
<template>
    <div class="ve_side_bar">
        <logo />
        <el-menu default-active="" :collapse="opened">
            <slide-menu
                v-for="item in menus"
                :key="item.id"
                :menu="item"
            ></slide-menu>
        </el-menu>
    </div>
</template>

<script>
import { computed, ref } from "vue";
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
        const menus = ref([]);

        // eslint-disable-next-line no-unused-vars
        const getMenuList = async () => {
            const data = await VE_API.user.userMenuList();
            if (data.code === "00") {
                const { list } = data;
                menus.value = list;
            }
        };
        getMenuList();
        return {
            opened,
            menus
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped></style>
