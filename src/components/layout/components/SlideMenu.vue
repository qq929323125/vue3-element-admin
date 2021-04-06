<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2021-03-26 09:10:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\components\SlideMenu.vue
-->
<template>
    <el-submenu
        :index="menu.id + ''"
        v-if="menu.type == 0 && filerMenus(menu.children)"
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
// import { inject } from "vue";
export default {
    props: ["menu"],
    setup() {
        // const reload = inject("reload");
        const router = useRouter();
        const clickMenu = menu => {
            let name = menu.url.replace(/\//g, "-") + `-${menu.id}`;
            if (menu.iframe == 1) {
                name = `i-${menu.id}`;
            }
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
        /**
         * @description:过滤空目录
         * @param {*}
         * @return {*}
         */
        const filerMenus = menus => {
            if (menus && menus.length > 0) {
                let _menus = XE.toTreeArray(menus);
                return _menus.some(item => item.type == 1);
            } else {
                return false;
            }
        };

        return {
            router,
            setIndex,
            clickMenu,
            filerMenus
        };
    }
};
</script>

<style lang="scss"></style>
