<!--
 * @Author: your name
 * @Date: 2021-01-08 14:23:41
 * @LastEditTime: 2021-02-07 10:10:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\logo.vue
-->
<template>
    <div class="ve_menu_logo">
        <div class="ve_logo_img">
            <el-image
                style="width:100%;height:100%"
                :src="require('../../../assets/logo.png')"
                fit="cover"
            ></el-image>
        </div>
        <h3 v-show="!opened" class="ve_logo_title">
            VE-Admin
        </h3>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        const opened = computed(() => store.getters.opened);
        return {
            opened
        };
    }
};
</script>

<style lang="scss" scoped>
.ve_menu_logo {
    width: 100%;
    height: $nav-height;
    white-space: nowrap;
    overflow: hidden;
    .ve_logo_img {
        height: 100%;
        // 和side收缩后的宽度一致
        width: $side-close-width;
        padding: 10px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
    }
    .ve_logo_title {
        width: $side-open-width;
        white-space: nowrap;
        display: inline-block;
        margin: 0;
        vertical-align: middle;
        &:hover {
            color: $base-color;
        }
    }
}
</style>
