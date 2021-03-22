<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2021-03-19 09:35:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\SlideMenu.vue
-->
<template>
    <el-submenu
        :index="menu.id + ''"
        v-if="menu.type == 0 && menu.children && menu.children.length > 0"
    >
        <template v-slot:title>
            <i :class="menu.icon"></i>
            <span>{{ menu.name }}</span>
        </template>
        <slide-menu
            v-for="child in menu.children"
            :key="child.id"
            :menu="child"
        ></slide-menu>
    </el-submenu>
    <el-menu-item
        v-else-if="menu.type == 1"
        :index="setIndex(menu)"
        @click="clickMenu(menu)"
    >
        <i :class="menu.icon"></i>
        <template #title>{{ menu.name }}</template>
    </el-menu-item>
</template>

<script>
import { useRouter } from "vue-router";
import { inject } from "vue";
export default {
    props: ["menu"],
    setup() {
        const reload = inject("reload");
        const router = useRouter();
        const clickMenu = menu => {
            let name = menu.url.replace(/\//g, "-") + `-${menu.id}`;
            if (menu.iframe == 1) {
                name = `i-${menu.id}`;
            }
            if (location.hash.includes(name)) {
                return;
            }
            reload();
            router.push({
                name
            });
        };

        const setIndex = menu => {
            let index = `/${menu.url.replace(/\//g, "-")}-${menu.id}`;
            if (menu.iframe == 1) {
                index = `/i-${menu.id}`;
            }
            return index;
        };

        return {
            router,
            setIndex,
            clickMenu
        };
    }
};
</script>

<style lang="scss"></style>
