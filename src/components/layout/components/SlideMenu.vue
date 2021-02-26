<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2021-02-24 16:15:14
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
        :index="`/${menu.url.replace(/\//g, '-')}-${menu.id}`"
        @click="clickMenu(menu)"
    >
        <i class="el-icon-menu"></i>
        <template #title>{{ menu.name }}</template>
    </el-menu-item>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    props: ["menu"],
    setup() {
        const router = useRouter();
        const clickMenu = menu => {
            let name = menu.url.replace("/", "-") + `-${menu.id}`;
            router.push({
                name
            });
        };

        return {
            router,
            clickMenu
        };
    }
};
</script>

<style lang="scss"></style>
