<!--
 * @Author: your name
 * @Date: 2021-01-15 16:42:16
 * @LastEditTime: 2021-01-15 17:01:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\Personal.vue
-->
<template>
    <div class="ve_personal">
        <router-link :to="{ name: 'Login' }">
            <el-link :underline="false">退出</el-link>
        </router-link>
    </div>
</template>

<script>
export default {
    setup() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.ve_personal {
    flex: 1;
    text-align: right;
}
</style>
