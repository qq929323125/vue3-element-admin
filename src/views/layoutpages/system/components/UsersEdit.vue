<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-03-04 17:04:55
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
        <el-form
            :model="form"
            ref="formRef"
            :rules="rules"
            label-width="80px"
            :inline="false"
        >
            <el-form-item label="用户名" prop="name">
                <el-input v-model="name" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="userName">
                <el-input
                    v-model="userName"
                    placeholder=""
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="password"
                    show-password
                    placeholder=""
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
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
                    <el-radio-button :label="1">
                        启用
                    </el-radio-button>
                    <el-radio-button :label="0">
                        停用
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <template v-slot:footer>
            <span>
                <el-button @click="closeDialog()">取消</el-button>
                <el-button type="primary" @click="onSubmit()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
const rules = {
    uname: [
        {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
        }
    ],
    name: [
        {
            required: true,
            message: "请输入账户",
            trigger: "blur"
        }
    ],
    pwd: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur"
        }
    ],
    role: [
        {
            required: true,
            message: "请选择角色",
            trigger: "blur"
        }
    ]
};
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
        const { rowData } = toRefs(props);
        const closeDialog = () => {
            emit("closeDialog", false);
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            userName: "",
            password: "",
            role: "",
            status: 1
        });
        const { userName, name, password, role, status } = toRefs(form);
        /**
         * @description: 初始化
         * @param {*}
         * @return {*}
         */
        rowData.value &&
            ((name.value = rowData.value.name),
            (userName.value = rowData.value.userName),
            (password.value = rowData.value.password),
            (role.value = rowData.value.role),
            (status.value = rowData.value.status));
        /**
         * @description:提交
         * @param {*}
         * @return {*}
         */
        const onSubmit = () => {
            formRef.value.validate(valid => {
                if (valid) {
                    closeDialog();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        };
        return {
            closeDialog,
            onSubmit,
            rules,
            formRef,
            form,
            ...{ userName, name, password, role, status }
        };
    }
};
</script>

<style lang="scss" scoped></style>
