<!--
 * @Author: your name
 * @Date: 2021-01-07 11:50:47
 * @LastEditTime: 2021-03-08 14:59:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\navbar.vue
-->
<template>
    <div class="ve_nav_bar">
        <hamburger></hamburger>
        <breadcrumb></breadcrumb>
        <personal></personal>
    </div>
</template>
<script>
import Hamburger from "./components/Hamburger.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import Personal from "./components/Personal.vue";
export default {
    name: "NavigateBar",
    components: {
        Hamburger,
        Breadcrumb,
        Personal
    }
};
</script>
<style lang="scss" scoped>
.ve_nav_bar {
    display: flex;
    align-items: center;
    height: 100%;
}
</style>
