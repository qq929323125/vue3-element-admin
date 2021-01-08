<!--
 * @Author: your name
 * @Date: 2021-01-07 16:23:33
 * @LastEditTime: 2021-01-08 16:37:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\SilderMenu.vue
-->
<template>
    <div class="ve_slider_menu" @click="fn_slider_menu">
        <i :class="[!opened ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
    name: "SliderMenu",
    setup() {
        const store = useStore();
        const opened = computed(() => store.getters.opened);
        const fn_slider_menu = () => {
            store.dispatch("app/toggle_slider");
        };
        return {
            opened,
            fn_slider_menu
        };
    }
};
</script>

<style lang="scss" scoped>
.ve_slider_menu {
    cursor: pointer;
    i {
        font-size: 40px;
    }
    &:hover i {
        color: $base-color;
    }
}
</style>
