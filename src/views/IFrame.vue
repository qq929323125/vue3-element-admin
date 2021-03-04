<!--
 * @Author: your name
 * @Date: 2021-03-02 09:30:13
 * @LastEditTime: 2021-03-03 16:14:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\IFrame.vue
-->
<template>
    <div
        v-loading="load"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
    >
        <iframe
            ref="iframe"
            :style="styles"
            :src="url"
            frameborder="0"
        ></iframe>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { nav_height } from "@/styles/variables.scss.js";
export default {
    props: {
        url: { type: String }
    },
    setup() {
        const load = ref(true);
        const iframe = ref(null);
        const styles = { "--nav_height": nav_height };

        const setLoad = () => {
            if (iframe.value.attachEvent) {
                iframe.value.attachEvent("onload", function() {
                    load.value = false;
                });
            } else {
                iframe.value.onload = function() {
                    load.value = false;
                };
            }
        };

        onMounted(() => {
            setLoad();
        });
        return { load, iframe, styles, nav_height };
    }
};
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: calc(100vh - var(--nav_height) - 83px);
}
</style>
