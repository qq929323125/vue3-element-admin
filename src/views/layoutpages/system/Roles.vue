<!--
 * @Author: your name
 * @Date: 2021-02-05 14:52:13
 * @LastEditTime: 2021-03-29 11:32:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\layoutpages\system\Roles.vue
-->
<template>
    <div class="ve_container">
        <!-- 搜索 -->
        <el-form ref="queryForm" :inline="true" :model="params">
            <el-form-item label="名称" prop="name">
                <el-input
                    clearable
                    v-model="name"
                    placeholder="请输入"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="onSubmit(params, getDataList)"
                    >{{ menus.search.name }}</el-button
                >
                <el-button @click="resetForm(queryForm, params, getDataList)"
                    >重置</el-button
                >
            </el-form-item>
        </el-form>

        <!-- table工具条 -->
        <el-row ref="toolBar" class="ve_header_row_class_name ve_p_10">
            <el-button
                v-permission="['add']"
                size="mini"
                type="primary"
                @click="handleEdit(menus.add.name)"
                >{{ menus.add.name }}</el-button
            >
        </el-row>

        <!-- 列表 -->
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            @row-click="(row, column, event) => (ve_rowIndex = rowClick(event))"
            :row-class-name="
                ({ rowIndex }) => rowClassName(rowIndex, ve_rowIndex)
            "
            :cell-class-name="
                ({ rowIndex }) => cellClassName(rowIndex, ve_rowIndex)
            "
            header-row-class-name="ve_header_row_class_name"
            header-cell-class-name="ve_header_cell_class_name"
            style="width: 100%"
            :max-height="ve_max_height"
        >
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="roleName" label="角色名" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态"
                ><template v-slot="{ row }">
                    <el-tag :type="row.status == 0 ? 'danger' : ''">{{
                        row.status == 0 ? "停用" : "启用"
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template v-slot:default="{ row }">
                    <el-button
                        v-permission="['edit']"
                        @click.prevent="handleEdit(menus.edit.name, row)"
                        type="primary"
                        size="mini"
                    >
                        {{ menus.edit.name }}
                    </el-button>
                    <el-button
                        v-permission="['del']"
                        @click.prevent="handleDel(row.id)"
                        type="danger"
                        size="mini"
                    >
                        {{ menus.del.name }}
                    </el-button>
                    <el-button
                        v-permission="['member']"
                        @click.prevent="allMember(row.id)"
                        type="info"
                        size="mini"
                    >
                        {{ menus.member.name }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            ref="pagination"
            background
            @size-change="val => handleSizeChange(val, params, getDataList)"
            @current-change="
                val => handleCurrentChange(val, params, getDataList)
            "
            :hide-on-single-page="total <= limit ? true : false"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 50, 100]"
            :current-page="page"
            :page-size="limit"
            :total="total"
        >
        </el-pagination>

        <!-- 编辑组件 -->
        <role-edit
            v-if="showDialog"
            :rowData="rowData"
            :title="dialogTitle"
            :showDialog="showDialog"
            @closeDialog="handelDialog($event)"
        />
    </div>
</template>

<script>
import RoleEdit from "./components/RoleEdit";
import {
    reactive,
    toRefs,
    computed,
    ref,
    onMounted,
    getCurrentInstance
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { findName } from "../common";

//*导入公共查询方法
import {
    onSubmit,
    resetForm,
    handleSizeChange,
    handleCurrentChange,
    rowClassName,
    cellClassName,
    rowClick,
    maxHeight
} from "@/views/layoutpages/common";
export default {
    data: () => ({
        description: "角色信息查询与设置",
        menus: {
            search: { name: "查询" },
            add: { name: "添加" },
            edit: { name: "编辑" },
            del: { name: "删除" },
            member: { name: "查看成员", toPath: true }
        }
    }),
    components: {
        RoleEdit
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const menuList = computed(() => store.getters.menuList).value;

        const rowData = ref(null);
        const dialogTitle = ref("");
        const showDialog = ref(false);
        const ve_max_height = ref(0);
        const ve_rowIndex = ref(null);
        const toolBar = ref(null);
        const pagination = ref(null);
        const queryForm = ref(null);
        const tableData = ref([]);
        const params = reactive({
            name: "",
            limit: 10,
            page: 1,
            total: 0
        });
        const { name, limit, page, total } = toRefs(params);

        /**
         * @description:添加or编辑事件
         * @param {*}
         * @return {*}
         */
        const handleEdit = (title, row = null) => {
            showDialog.value = true;
            dialogTitle.value = title;
            rowData.value = row;
        };
        /**
         * @description: dialog事件
         * @param {*}
         * @return {*}
         */
        const handelDialog = e => {
            showDialog.value = e;
            getDataList();
        };
        /**删除行数据
         * @description:
         * @param {*}
         * @return {*}
         */
        const handleDel = id => {
            proxy
                .$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "error"
                })
                .then(async () => {
                    const { code } = await VE_API.system.roleDel({ id });
                    if (code == "00") {
                        getDataList();
                    }
                })
                .catch(() => {
                    proxy.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        };
        /**
         * @description:查看成员
         * @param {*}
         * @return {*}
         */
        const allMember = id => {
            // 获取当前path的id
            let pathId = route.name.slice(route.name.lastIndexOf("-") + 1);
            // 获取要跳转到的路由
            const toName = findName(
                "member",
                "system/Users",
                pathId,
                menuList,
                proxy
            );
            router.push({ name: toName, query: { id } });
        };
        /**
         * @description: 获取列表数据
         * @param {*}
         * @return {*}
         */
        const getDataList = async () => {
            const { code, data } = await VE_API.system.roleList(params);
            if (code == "00") {
                const { limit, page, total, list } = data;
                params.limit = limit;
                params.page = page;
                params.total = total;
                tableData.value = list;
            }
        };
        onMounted(async () => {
            await getDataList();
            maxHeight(pagination, queryForm, toolBar, ve_max_height);
        });
        return {
            ve_max_height,
            ve_rowIndex,
            getDataList,
            tableData,
            params,
            ...{ name, limit, page, total },
            ...{ pagination, queryForm, toolBar },
            ...{ handleEdit, rowData, dialogTitle, showDialog },
            ...{
                onSubmit,
                resetForm,
                handleSizeChange,
                handleCurrentChange,
                rowClassName,
                cellClassName,
                rowClick,
                maxHeight
            },
            handelDialog,
            handleDel,
            allMember
        };
    }
};
</script>

<style lang="scss" scoped></style>
