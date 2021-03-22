<!--
 * @Author: your name
 * @Date: 2021-03-22 10:54:32
 * @LastEditTime: 2021-03-22 13:54:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\FunctionPage.vue
-->
<template>
    <div>
        <el-page-header @back="goBack()" :content="title"> </el-page-header>
        <el-divider></el-divider>
        <slot />
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    props: {
        title: {
            type: String,
            require: true
        }
    },
    setup() {
        const router = useRouter();
        const goBack = () => {
            router.back();
        };
        return { goBack };
    }
};
</script>

<style lang="scss" scoped></style>
