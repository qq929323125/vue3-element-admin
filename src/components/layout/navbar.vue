<!--
 * @Author: your name
 * @Date: 2021-01-07 11:50:47
 * @LastEditTime: 2021-01-08 15:24:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\navbar.vue
-->
<template>
    <div class="ve_nav_bar"><hamburger></hamburger></div>
</template>
<script>
import Hamburger from "./components/Hamburger.vue";
export default {
    name: "NavBar",
    components: {
        Hamburger
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
