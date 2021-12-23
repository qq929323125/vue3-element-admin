<!--
 * @Author: your name
 * @Date: 2021-08-11 11:18:05
 * @LastEditTime: 2021-12-23 16:54:12
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
            <div class="ve_table_content" ref="tableBox">
                <el-table
                    ref="elTable"
                    :height="size.height"
                    stripe
                    border
                    highlight-current-row
                    @row-click="
                        (row, column, event) => (ve_rowIndex = rowClick(event))
                    "
                    :row-class-name="
                        ({ rowIndex }) => rowClassName(rowIndex, ve_rowIndex)
                    "
                    :cell-class-name="
                        ({ rowIndex }) => cellClassName(rowIndex, ve_rowIndex)
                    "
                    header-row-class-name="ve_header_row_class_name"
                    header-cell-class-name="ve_header_cell_class_name"
                    style="width: 100%"
                    v-bind="$attrs.table"
                >
                    <slot></slot>
                    <template #append><slot name="append"></slot></template>
                    <template #empty>
                        <el-empty description="暂无数据"></el-empty>
                    </template>
                </el-table>
            </div>
            <!-- 分页 -->
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100, 200, 500]"
                v-bind="$attrs.pagination"
            >
                <slot name="pagination"></slot>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { useElementSize } from "@vueuse/core";

import { ref, reactive } from "vue";
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
    setup() {
        const elTable = ref(null);
        const ve_rowIndex = ref(null);

        const clearSelection = () => elTable.value.clearSelection();
        const toggleRowSelection = (row, selected) =>
            elTable.value.toggleRowSelection(row, selected);
        const toggleAllSelection = () => elTable.value.toggleAllSelection();
        const toggleRowExpansion = (row, expanded) =>
            elTable.value.toggleRowExpansion(row, expanded);
        const setCurrentRow = (row) => elTable.value.setCurrentRow(row);
        const clearSort = () => elTable.value.clearSort();
        const clearFilter = (columnKey) => elTable.value.clearFilter(columnKey);
        const doLayout = () => elTable.value.doLayout();
        const sort = (prop, order) => elTable.value.sort(prop, order);
        const tableBox = ref(null);
        const size = reactive(useElementSize(tableBox));
        /**
         * @description:行点击事件
         * @param {*}
         * @return {*}
         */
        const rowClick = (event) => {
            // return event.currentTarget.rowIndex;
            return event;
        };
        /**
         * @description:高亮当前行
         * @param {*}
         * @return {*}
         */
        const rowClassName = (rowIndex, ve_rowIndex) => {
            if (rowIndex == ve_rowIndex) {
                return "ve_row_class_name";
            } else {
                return "";
            }
        };
        /**
         * @description:高亮单元格
         * @param {*}
         * @return {*}
         */
        const cellClassName = (rowIndex, ve_rowIndex) => {
            if (rowIndex == ve_rowIndex) {
                return "ve_cell_class_name";
            } else {
                return "";
            }
        };

        return {
            elTable,
            clearSelection,
            toggleRowSelection,
            toggleAllSelection,
            toggleRowExpansion,
            setCurrentRow,
            clearSort,
            clearFilter,
            doLayout,
            sort,
            tableBox,
            size,

            ve_rowIndex,
            cellClassName,
            rowClassName,
            rowClick,
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
