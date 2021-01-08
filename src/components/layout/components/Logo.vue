<!--
 * @Author: your name
 * @Date: 2021-01-08 14:23:41
 * @LastEditTime: 2021-01-08 16:56:59
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
        <transition name="el-fade-in-linear">
            <h3 v-show="!opened" class="ve_logo_title">VE-Admin</h3>
        </transition>
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
    }
}
</style>
