/*
 * @Author: your name
 * @Date: 2021-02-07 17:11:28
 * @LastEditTime: 2021-03-01 14:26:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\common.js
 */

/**
 * @description:提交搜索
 * @param {*}
 * @return {*}
 */
export const onSubmit = (params, getDataList) => {
    params.limit = 10;
    params.page = 1;
    getDataList();
};
/**
 * @description:重置
 * @param {*}
 * @return {*}
 */
export const resetForm = (queryForm, params, getDataList) => {
    queryForm.resetFields();
    onSubmit(params, getDataList);
};
/**
 * @description:每页条数事件
 * @param {*}
 * @return {*}
 */
export const handleSizeChange = (val, params, getDataList) => {
    params.limit = val;
    getDataList();
};
/**
 * @description:改变页数事件
 * @param {*}
 * @return {*}
 */
export const handleCurrentChange = (val, params, getDataList) => {
    params.page = val;
    getDataList();
};

/**
 * @description:高亮单元格
 * @param {*}
 * @return {*}
 */
export const cellClassName = (rowIndex, ve_rowIndex) => {
    if (rowIndex == ve_rowIndex) {
        return "ve_cell_class_name";
    } else {
        return "";
    }
};

/**
 * @description:高亮当前行
 * @param {*}
 * @return {*}
 */
export const rowClassName = (rowIndex, ve_rowIndex) => {
    if (rowIndex == ve_rowIndex) {
        return "ve_row_class_name";
    } else {
        return "";
    }
};
/**
 * @description:行点击事件
 * @param {*}
 * @return {*}
 */
export const rowClick = event => {
    // return event.currentTarget.rowIndex;
    return event;
};
/**
 * @description:计算表格的最大高度
 * @param {*}
 * @return {*}
 */
// pagination, queryForm
export const maxHeight = (pagination, queryForm, toolBar, ve_max_height) => {
    onresize = () => {
        maxHeight(pagination, queryForm, toolBar, ve_max_height);
    };
    let docHeight = document.documentElement.clientHeight;
    let toolBarHeight = toolBar.value ? toolBar.value.$el.offsetHeight : 0;
    let paginationHeight = pagination.value
        ? pagination.value.$el.offsetHeight
        : 0;
    let queryFormHeight = queryForm.value
        ? queryForm.value.$el.offsetHeight
        : 0;
    ve_max_height.value =
        docHeight - paginationHeight - queryFormHeight - toolBarHeight - 130;
};
