<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2021-03-02 11:13:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\SlideMenu.vue
-->
<template>
    <el-submenu
        :index="menu.name"
        v-if="menu.children && menu.children.length > 0"
    >
        <template #title>
            <i class="el-icon-location"></i>
            <span>{{ menu.name }}</span>
        </template>
        <slide-menu
            v-for="child in menu.children"
            :key="child.id"
            :menu="child"
        ></slide-menu>
    </el-submenu>
    <el-menu-item
        v-else-if="menu.url"
        :index="setIndex(menu)"
        @click="clickMenu(menu)"
    >
        <i class="el-icon-menu"></i>
        <template #title>{{ menu.name }}</template>
    </el-menu-item>
</template>

<script>
import { isURL } from "@/utils/validate";
import { useRouter } from "vue-router";
export default {
    props: ["menu"],
    setup() {
        const router = useRouter();
        const clickMenu = menu => {
            let name = menu.url.replace("/", "-") + `-${menu.id}`;
            if (isURL(menu.url)) {
                name = `i-${menu.id}`;
            }
            router.push({
                name
            });
        };

        const setIndex = menu => {
            let index = `/${menu.url.replace(/\//g, "-")}-${menu.id}`;
            if (isURL(menu.url)) {
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
