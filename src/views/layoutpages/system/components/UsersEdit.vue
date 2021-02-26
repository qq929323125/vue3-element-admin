<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-02-26 11:19:24
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
        <!-- <span>{{ rowData }}</span> -->
        <!-- 表单 -->
        <el-form :model="form" label-width="80px" :inline="false">
            <el-form-item label="用户名">
                <el-input v-model="uname" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="name" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input
                    v-model="pwd"
                    show-password
                    placeholder=""
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select
                    style="width:100%"
                    v-model="role"
                    placeholder=""
                    clearable
                >
                    <el-option label="管理员" :value="0"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="status">
                    <el-radio-button :label="true">
                        启用
                    </el-radio-button>
                    <el-radio-button :label="false">
                        停用
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>

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
import { reactive, toRefs } from "vue";
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
        const form = reactive({
            uname: "",
            name: "",
            pwd: "",
            role: "",
            status: true
        });
        const { uname, name, pwd, role, status } = toRefs(form);
        return {
            closeDialog,
            form,
            ...{ uname, name, pwd, role, status }
        };
    }
};
</script>

<style lang="scss" scoped></style>
