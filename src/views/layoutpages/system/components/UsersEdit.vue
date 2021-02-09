<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-02-09 16:49:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\layoutpages\system\components\usersEdit.vue
-->
<template>
    <el-dialog
        :title="title"
        append-to-body
        destroy-on-close
        :model-value="showDialog"
        @close="closeDialog()"
    >
        <span>{{ rowData }}</span>
        <template v-slot:footer>
            <span>
                <el-button @click="closeDialog()">取消</el-button>
                <el-button type="primary" @click="closeDialog()"
                    >确定</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script>
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: "添加"
        },
        rowData: {
            type: Object,
            default: null
        }
    },
    emits: ["closeDialog"],
    setup(props, { emit }) {
        const closeDialog = () => {
            emit("closeDialog", false);
        };
        return {
            closeDialog
        };
    }
};
</script>

<style lang="scss" scoped></style>
