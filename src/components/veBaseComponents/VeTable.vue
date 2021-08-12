<!--
 * @Author: your name
 * @Date: 2021-08-11 11:18:05
 * @LastEditTime: 2021-08-12 17:59:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\VeTable.vue
-->
<template>
    <div v-addClass class="ve_table">
        <!-- table工具条 -->
        <el-row v-delete class="ve_header_row_class_name ve_p_10">
            <slot name="tool_bar"></slot>
        </el-row>
        <div class="ve_table_page">
            <!-- 列表 -->
            <div class="ve_table_content">
                <el-table ref="table" height="100%" v-bind="$attrs"
                    ><slot></slot>
                    <template #append><slot name="append"></slot> </template>
                </el-table>
            </div>
            <!-- 分页 -->
            <el-pagination
                v-if="pagination"
                background
                @size-change="(val) => $emit('handleSizeChange', val)"
                @current-change="(val) => $emit('handleCurrentChange', val)"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100]"
                :current-page="page"
                :page-size="limit"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "VeTable",
    inheritAttrs: false,
    directives: {
        delete: (el) => {
            const length = el.children.length;
            if (length <= 0) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        },
        addClass: (el) => {
            el.parentNode && el.parentNode.classList.add("ve_flex_col");
        },
    },
    props: {
        page: {
            default: 0,
            type: Number,
        },
        limit: {
            default: 0,
            type: Number,
        },
        total: {
            default: 0,
            type: Number,
        },
        pagination: {
            default: true,
            type: Boolean,
        },
    },
    setup() {
        const queryForm = ref(null);

        const clearSelection = () => queryForm.value.clearSelection();
        const toggleRowSelection = (row, selected) =>
            queryForm.value.toggleRowSelection(row, selected);
        const toggleAllSelection = () => queryForm.value.toggleAllSelection();
        const toggleRowExpansion = (row, expanded) =>
            queryForm.value.toggleRowExpansion(row, expanded);
        const setCurrentRow = (row) => queryForm.value.setCurrentRow(row);
        const clearSort = () => queryForm.value.clearSort();
        const clearFilter = (columnKey) =>
            queryForm.value.clearFilter(columnKey);
        const doLayout = () => queryForm.value.doLayout();
        const sort = (prop, order) => queryForm.value.sort(prop, order);
        return {
            queryForm,
            clearSelection,
            toggleRowSelection,
            toggleAllSelection,
            toggleRowExpansion,
            setCurrentRow,
            clearSort,
            clearFilter,
            doLayout,
            sort,
        };
    },
};
</script>

<style lang="scss" scoped>
.ve_table {
    flex: 1;
    display: flex;
    flex-direction: column;
    .ve_table_page {
        flex: 1;
        display: flex;
        flex-direction: column;
        .ve_table_content {
            flex: 1;
        }
    }
}
</style>
