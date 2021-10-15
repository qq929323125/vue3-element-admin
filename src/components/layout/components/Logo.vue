<!--
 * @Author: your name
 * @Date: 2021-01-08 14:23:41
 * @LastEditTime: 2021-10-15 17:27:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\components\Logo.vue
-->
<template>
    <el-tooltip :content="title" placement="right-end" effect="dark">
        <div class="ve_menu_logo">
            <div class="ve_logo_img">
                <el-image
                    style="height: 100%"
                    :src="require('../../../assets/logo.png')"
                    fit="contain"
                ></el-image>
            </div>
            <!-- content to trigger tooltip here -->
            <h3 v-show="!opened" class="ve_logo_title">
                {{ title }}
            </h3>
        </div>
    </el-tooltip>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const opened = computed(() => store.getters.opened);
const title = "vue3-element-admin";
</script>

<style lang="scss" scoped>
.ve_menu_logo {
    width: 100%;
    height: $nav-height;
    white-space: nowrap;
    overflow: hidden;
    .ve_logo_img {
        height: 100%;
        text-align: center;
        // 和side收缩后的宽度一致
        width: $side-close-width;
        // padding: 10px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
    }
    .ve_logo_title {
        width: $side-open-width;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        margin: 0;
        vertical-align: middle;
        color: #000;
        &:hover {
            color: $base-color;
        }
    }
}
</style>
