<!--
 * @Author: your name
 * @Date: 2021-03-02 09:30:13
 * @LastEditTime: 2022-04-28 16:31:31
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
import { onMounted, ref } from "vue";
import { nav_height } from "@/styles/variables.scss.js";

const props = defineProps({
    url: { type: String },
});
const load = ref(true);
const iframe = ref(null);

const setLoad = () => {
    const $onLoad = () => {
        load.value = false;
    };
    if (iframe.value.attachEvent) {
        iframe.value.attachEvent("onload", $onLoad);
    } else {
        iframe.value.onload = $onLoad;
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
