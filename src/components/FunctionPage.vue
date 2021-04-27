<!--
 * @Author: your name
 * @Date: 2021-03-22 10:54:32
 * @LastEditTime: 2021-04-27 11:12:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\FunctionPage.vue
-->
<template>
    <div>
        <el-page-header @back="goBack()" :content="title"> </el-page-header>
        <el-alert
            style="margin-top:20px"
            type="info"
            description="当前为动态权限页面!离开后将无法访问!刷新页面请使用本系统自带刷新按钮!!!"
            show-icon
            close-text="知道了"
        >
        </el-alert>
        <el-divider></el-divider>
        <slot />
    </div>
</template>

<script>
// import { onUnmounted } from "vue";
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
        // const route = useRoute();
        const goBack = () => {
            router.back();
        };
        return { goBack };
    }
};
</script>

<style lang="scss" scoped></style>
