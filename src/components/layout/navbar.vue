<!--
 * @Author: your name
 * @Date: 2021-01-07 11:50:47
 * @LastEditTime: 2021-01-15 16:57:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\navbar.vue
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
    name: "NavBar",
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
