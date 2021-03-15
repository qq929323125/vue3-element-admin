<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-03-15 15:37:35
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
            <el-form-item label="名称" prop="name">
                <el-input v-model="name" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="角色名" prop="roleName">
                <el-input
                    v-model="roleName"
                    placeholder=""
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="role">
                <el-card
                    shadow="never"
                    :body-style="{ padding: 0, height: '200px' }"
                    ><el-scrollbar>
                        <el-tree
                            ref="tree"
                            :data="menuList"
                            node-key="id"
                            default-expand-all
                            :props="{ label: 'name' }"
                            empty-text="暂无数据"
                            show-checkbox
                            highlight-current
                        >
                            <template v-slot="{ data }">
                                <span
                                    :data-roleId="data.id"
                                    :class="{ ve_tree_item: data.type == 2 }"
                                    >{{ data.name }}</span
                                >
                            </template>
                        </el-tree></el-scrollbar
                    >
                    <!-- card body -->
                </el-card>
            </el-form-item>
            <el-form-item label="状态" prop="status">
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
import { onMounted, reactive, ref, toRefs, nextTick } from "vue";
import { treeFindPath } from "@/utils";
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
        const form = reactive({
            roleName: "",
            name: "",
            role: [],
            status: 1
        });
        const { roleName, name, role, status } = toRefs(form);
        const formRef = ref(null);
        const rules = {
            name: [
                {
                    required: true,
                    message: "请输入名称",
                    trigger: "blur"
                }
            ],
            roleName: [
                {
                    required: true,
                    message: "请输入角色名",
                    trigger: "blur"
                }
            ],
            role: [
                {
                    validator: (rule, value, callback) => {
                        role.value = tree.value.getCheckedKeys();
                        if (role.value.length < 1) {
                            callback(new Error("请选择权限"));
                        } else {
                            callback();
                        }
                    },
                    required: true
                }
            ]
        };
        const tree = ref(null);
        const menuList = ref([]);
        /**
         * @description: 数据初始化
         * @param {*}
         * @return {*}
         */
        rowData.value &&
            ((name.value = rowData.value.name),
            (roleName.value = rowData.value.roleName),
            (status.value = rowData.value.status));
        /**
         * @description:提交
         * @param {*}
         * @return {*}
         */
        const onSubmit = () => {
            formRef.value.validate(valid => {
                if (valid) {
                    console.log(form);
                    closeDialog();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        };

        /**
         * @description: 获取菜单数据
         * @param {*}
         * @return {*}
         */
        const getMenuList = async () => {
            const { code, data } = await VE_API.system.menuList(
                {
                    limit: 10,
                    page: 1,
                    total: 0
                },
                { Global: false }
            );
            if (code == "00") {
                const { list } = data;
                menuList.value = list;
            }
        };

        /**
         * @description:改变按钮的排列样式
         * @param {*}
         * @return {*}
         */
        const setMenuStyle = () => {
            let eles = document.getElementsByClassName("ve_tree_item");
            eles.forEach(e => {
                const roleId = e.dataset.roleid * 1;
                const index =
                    treeFindPath(menuList.value, item => item.id == roleId)
                        .length - 1;
                e.parentNode.parentNode.parentNode.style.paddingLeft =
                    index * 18 + "px";
                let oldClass = e.parentNode.className;
                e.parentNode.className = oldClass + " fl p0";
            });
        };
        onMounted(async () => {
            await getMenuList();
            nextTick(() => {
                setMenuStyle();
                tree.value.setCheckedNodes(XE.toTreeArray(menuList.value));
            });
        });

        return {
            closeDialog,
            onSubmit,
            form,
            formRef,
            rules,
            ...{ roleName, name, status },
            tree,
            menuList
        };
    }
};
</script>

<style lang="scss">
.fl {
    float: left;
}
.p0 {
    padding: 0 !important;
}
.clear_both ::after {
    clear: both;
}
</style>
