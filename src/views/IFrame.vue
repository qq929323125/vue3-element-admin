<!--
 * @Author: your name
 * @Date: 2021-03-02 09:30:13
 * @LastEditTime: 2021-10-15 14:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\IFrame.vue
-->
<template>
    <div
        v-loading="load"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
    >
        <iframe ref="iframe" :src="props.url" frameborder="0"></iframe>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { nav_height } from "@/styles/variables.scss.js";

const props = defineProps({
    url: { type: String },
});
const load = ref(true);
const iframe = ref(null);

const setLoad = () => {
    if (iframe.value.attachEvent) {
        iframe.value.attachEvent("onload", function () {
            load.value = false;
        });
    } else {
        iframe.value.onload = function () {
            load.value = false;
        };
    }
};

onMounted(() => {
    setLoad();
});
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: calc(100vh - v-bind(nav_height) - 83px);
}
</style>
