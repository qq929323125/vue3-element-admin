<!--
 * @Author: your name
 * @Date: 2021-01-07 11:50:47
 * @LastEditTime: 2021-01-15 11:15:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\navbar.vue
-->
<template>
    <div class="ve_nav_bar">
        <hamburger></hamburger><breadcrumb></breadcrumb>
    </div>
</template>
<script>
import Hamburger from "./components/Hamburger.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
export default {
    name: "NavBar",
    components: {
        Hamburger,
        Breadcrumb
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
