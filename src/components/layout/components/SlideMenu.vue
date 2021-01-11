<!--
 * @Author: your name
 * @Date: 2021-01-08 16:58:43
 * @LastEditTime: 2021-01-11 18:07:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\SlideMenu.vue
-->
<template>
    <el-submenu
        :index="menu.id"
        v-if="menu.children && menu.children.length > 0"
    >
        <template #title>
            <i class="el-icon-location"></i>
            <span>{{ menu.tag }}</span>
        </template>
        <slide-menu
            v-for="childItem in menu.children"
            :key="childItem.id"
            :menu="childItem"
        ></slide-menu>
    </el-submenu>
    <el-menu-item :index="menu.id" v-else>
        <i class="el-icon-menu"></i>
        <template #title>{{ menu.tag }}</template>
    </el-menu-item>
</template>

<script>
export default {
    props: ["menu"],
    setup() {
        return {};
    }
};
</script>

<style lang="scss" scoped></style>
