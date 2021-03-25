/*
 * @Author: your name
 * @Date: 2021-02-07 17:11:28
 * @LastEditTime: 2021-03-25 17:43:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\layoutpages\common.js
 */
import { defineAsyncComponent } from "vue";
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
    let toolBarHeight = toolBar.value ? toolBar.value.$el.offsetHeight || 0 : 0;
    let paginationHeight = pagination.value
        ? pagination.value.$el.offsetHeight || 0
        : 0;
    let queryFormHeight = queryForm.value
        ? queryForm.value.$el.offsetHeight || 0
        : 0;
    ve_max_height.value =
        docHeight - paginationHeight - queryFormHeight - toolBarHeight - 130;
};
/**
 * @description: 获取按钮跳转菜单的路径
 * @param {*}
 * @return {*}
 */
export const findName = (btnName, toPathUrl, pathId, menuList, ctx) => {
    let toId = "";
    let _item = XE.findTree(menuList, item => item.id == pathId);
    if (
        _item &&
        _item.item &&
        _item.item.children &&
        _item.item.children.length > 0
    ) {
        let btn = _item.item.children.find(item => item.menu == btnName);

        btn && (toId = btn.toPath);
    }
    if (toId != "") {
        let _toItem = XE.findTree(menuList, item => item.id == toId);
        if (_toItem && _toItem.item) {
            if (_toItem.item.iframe == 0) {
                if (_toItem.item.url == toPathUrl) {
                    return `${toPathUrl.replace(/\//g, "-")}-${toId}`;
                }
            } else {
                return `i-${toId}`;
            }
        }
    }
    ctx.$message({
        type: "error",
        message: "无法跳转,请联系系统管理员!"
    });
};
/**
 * @description:根据权限动态添加路由
 * @param {*}
 * @return {*}
 */
export const getAsyncRouteName = async (
    title,
    path,
    name,
    { router, route }
) => {
    const app = {
        components: {
            AsyncComponent: defineAsyncComponent(() =>
                import("@/views/layoutpages/" + path + ".vue")
            )
        },
        data: () => ({
            rName: null
        }),
        methods: {
            reload(e) {
                return (e.returnValue = "");
            }
        },
        mounted() {
            this.rName = this.$route.name;
            window.addEventListener("beforeunload", this.reload);
        },
        beforeUnmount() {
            window.removeEventListener("beforeunload", this.reload);
            this.$router.removeRoute(this.rName);
        },
        render() {
            return (
                <function-page title={title}>
                    <async-component />
                </function-page>
            );
        }
    };
    const _route = {
        name: route.name + "/" + name,
        path: route.name + "/" + name,

        component: app
    };
    await router.addRoute("AppMain", _route);
    return _route.name;
};
