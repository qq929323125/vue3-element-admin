<!--
 * @Author: your name
 * @Date: 2021-01-07 11:41:32
 * @LastEditTime: 2021-01-12 11:06:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\layoutpages\test\Label1.vue
-->
<template>
    <div class="home">
        <img alt="Vue logo" :src="require('../../assets/logo.png')" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Label1",
    components: {
        HelloWorld
    }
};
</script>
