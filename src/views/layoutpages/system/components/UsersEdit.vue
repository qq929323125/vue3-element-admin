<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2022-04-28 16:32:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\layoutpages\system\components\usersEdit.vue
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
            <el-form-item label="账号" prop="name">
                <el-input v-model="name" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
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
                    style="width: 100%"
                    v-model="role"
                    placeholder=""
                    clearable
                >
                    <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.status == 0"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="status">
                    <el-radio-button :label="1">启用</el-radio-button>
                    <el-radio-button :label="0">停用</el-radio-button>
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

<script setup>
import { reactive, toRefs, ref } from "vue";
const rules = {
    name: [
        {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
        },
    ],
    userName: [
        {
            required: true,
            message: "请输入账户",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur",
        },
    ],
    role: [
        {
            required: true,
            message: "请选择角色",
            trigger: "change",
        },
    ],
};
const props = defineProps({
    showDialog: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: "添加",
    },
    rowData: {
        type: Object,
        default: null,
    },
});
const emit = defineEmits(["closeDialog"]);
const { title, rowData } = toRefs(props);
const closeDialog = () => {
    emit("closeDialog", false);
};
const formRef = ref(null);
const form = reactive({
    name: "",
    userName: "",
    password: "",
    role: "",
    status: 1,
});
const { userName, name, password, role, status } = toRefs(form);
const roleList = ref([]);

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
 * @description: 获取角色列表
 * @param {*}
 * @return {*}
 */
const getRoleList = async () => {
    const { code, data } = await VE_API.system.roleList(
        {
            page: 1,
            limit: 10,
        },
        { Global: false }
    );
    if (code == "00") {
        const { list } = data;
        roleList.value = list;
    }
};
getRoleList();
/**
 * @description:提交
 * @param {*}
 * @return {*}
 */
const onSubmit = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            let res;
            if (title.value == "添加") {
                res = await VE_API.system.userAdd(form);
            } else {
                res = await VE_API.system.userEdit({
                    id: rowData.value.id,
                    ...form,
                });
            }
            const { code } = res;
            if (code == "00") {
                closeDialog();
            }
        } else {
            console.log("error submit!!");
            return false;
        }
    });
};
</script>

<style lang="scss" scoped></style>
