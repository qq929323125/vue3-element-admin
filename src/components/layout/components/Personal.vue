<!--
 * @Author: your name
 * @Date: 2021-01-15 16:42:16
 * @LastEditTime: 2021-03-22 14:56:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\Personal.vue
-->
<template>
    <div class="ve_personal">
        <el-button
            title="刷新"
            style="border:none"
            icon="el-icon-refresh"
            circle
            plain
            @click="reload()"
        ></el-button>
        <el-divider direction="vertical"></el-divider>
        <router-link :to="{ name: 'Login' }">
            <el-link :underline="false">退出</el-link>
        </router-link>
    </div>
</template>

<script>
import { inject } from "vue";
export default {
    setup() {
        const reload = inject("reload");
        return { reload };
    }
};
</script>

<style lang="scss" scoped>
.ve_personal {
    flex: 1;
    text-align: right;
}
</style>
