<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2022-04-28 16:31:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\components\SlideMenu.vue
-->
<template>
    <el-sub-menu
        :index="menu.id + ''"
        v-if="menu.type == 0 && filerMenus(menu.children)"
    >
        <template #title>
            <el-icon :size="16" style="margin-right: 6px">
                <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.name }}</span>
        </template>
        <slide-menu
            v-for="child in menu.children"
            :key="child.id"
            :menu="child"
        ></slide-menu>
    </el-sub-menu>
    <el-menu-item
        v-else-if="menu.type == 1"
        :index="setIndex(menu)"
        @click="clickMenu(menu)"
    >
        <template #title>
            <el-icon :size="16" style="margin-right: 6px">
                <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.name }}</span>
        </template>
    </el-menu-item>
</template>

<script setup>
import { useRouter } from "vue-router";
import { toRefs } from "vue";
const props = defineProps(["menu"]);
const { menu } = toRefs(props);

// const reload = inject("reload");
const router = useRouter();
const clickMenu = (menu) => {
    let name = menu.url.replace(/\//g, "-") + `-${menu.id}`;
    if (menu.iframe == 1) {
        name = `i-${menu.id}`;
    }
    router.push({
        name,
    });
};

const setIndex = (menu) => {
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
const filerMenus = (menus) => {
    if (menus && menus.length > 0) {
        let _menus = XE.toTreeArray(menus);
        return _menus.some((item) => item.type == 1);
    } else {
        return false;
    }
};
</script>

<style lang="scss">
li.el-menu-item.is-active {
    background-color: darken($sideBgColor, 15%) !important;
}
.el-menu-item .el-icon svg {
    vertical-align: unset;
}
.el-sub-menu__title .el-icon svg {
    vertical-align: unset;
}
// .el-sub-menu.is-active:not(.is-opened) .el-sub-menu__title i {
//     color: $base-color;
// }
</style>
