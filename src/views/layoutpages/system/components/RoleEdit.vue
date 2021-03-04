<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-03-04 17:18:06
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
            <el-form-item label="名称" prop="name">
                <el-input v-model="name" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleName">
                <el-input
                    v-model="roleName"
                    placeholder=""
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item label="权限">
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
                        ></el-tree
                    ></el-scrollbar>
                    <!-- card body -->
                </el-card>
            </el-form-item>
            <el-form-item label="状态" prop="status">
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
import { onMounted, reactive, ref, toRefs, computed, nextTick } from "vue";
import { useStore } from "vuex";
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
            roleName: "",
            name: "",
            status: true
        });
        const { roleName, name, status } = toRefs(form);
        const tree = ref(null);

        const store = useStore();
        const menuList = computed(() => store.getters.menuList);
        onMounted(() => {
            nextTick(() => {
                tree.value.setCheckedNodes(menuList.value);
            });
        });

        return {
            closeDialog,
            form,
            ...{ roleName, name, status },
            tree,
            menuList
        };
    }
};
</script>

<style lang="scss" scoped></style>
