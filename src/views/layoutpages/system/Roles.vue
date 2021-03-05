<!--
 * @Author: your name
 * @Date: 2021-02-05 14:52:13
 * @LastEditTime: 2021-03-05 10:25:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\layoutpages\system\Users.vue
-->
<template>
    <div class="ve_container">
        <!-- 搜索 -->
        <el-form ref="queryForm" :inline="true" :model="params">
            <el-form-item label="名称" prop="name">
                <el-input
                    clearable
                    v-model="name"
                    placeholder="审批人"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(params, getDataList)"
                    >查询</el-button
                >
                <el-button @click="resetForm(queryForm, params, getDataList)"
                    >重置</el-button
                >
            </el-form-item>
        </el-form>

        <!-- table工具条 -->
        <el-row ref="toolBar" class="ve_header_row_class_name ve_p_10">
            <el-button size="mini" type="primary" @click="handleEdit('添加')"
                >添加</el-button
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
                        @click.prevent="handleEdit('编辑', row)"
                        type="primary"
                        size="mini"
                    >
                        编辑
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
            @closeDialog="e => (showDialog = e)"
        />
    </div>
</template>

<script>
import RoleEdit from "./components/RoleEdit";
import { reactive, toRefs, ref, onMounted } from "vue";
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
    components: {
        RoleEdit
    },
    setup() {
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
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
