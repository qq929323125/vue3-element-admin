<!--
 * @Author: your name
 * @Date: 2021-01-07 09:49:29
 * @LastEditTime: 2021-01-07 10:58:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\App.vue
-->
<template>
    <div id="app">
        <img src="./assets/logo.png" />
        <div>
            <p>
                If Element Plus is successfully added to this project, you'll
                see an
                <code v-text="'<el-button>'"></code>
                below
            </p>
            <el-button type="primary">el-button</el-button>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "App",
    components: {
        HelloWorld
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
