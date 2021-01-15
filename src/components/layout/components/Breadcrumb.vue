<!--
 * @Author: your name
 * @Date: 2021-01-15 10:57:50
 * @LastEditTime: 2021-01-15 16:03:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\components\layout\components\Breadcrumb.vue
-->
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{
            item
        }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const menuList = computed(() => store.getters.menuList).value;
        const list = computed(() => {
            let path = route.path;
            let i = path.lastIndexOf("-");
            return treeFindPath(
                menuList,
                data => data.id === path.slice(i + 1) * 1
            );
        });
        /**
         * @description:这个函数好牛逼
         * @param {*} tree
         * @param {*} func
         * @param {*} path
         * @return {*}
         */
        const treeFindPath = (tree, func, path = []) => {
            if (!tree) return [];
            for (const data of tree) {
                // 这里按照你的需求来存放最后返回的内容吧
                path.push(data.name);
                if (func(data)) return path;
                if (data.children) {
                    const findChildren = treeFindPath(
                        data.children,
                        func,
                        path
                    );
                    if (findChildren.length) return findChildren;
                }
                path.pop();
            }
            return [];
        };
        return {
            list
        };
    }
};
</script>

<style lang="scss" scoped></style>
