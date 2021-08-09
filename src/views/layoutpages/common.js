/*
 * @Author: your name
 * @Date: 2021-02-07 17:11:28
 * @LastEditTime: 2021-04-27 12:58:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\layoutpages\common.js
 */
import { defineAsyncComponent } from "vue";
import FunctionPage from "@/components/FunctionPage";

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
export const rowClick = (event) => {
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
 * @param {btnName} 跳转按钮的key值
 * @param {toPathUrl} 需要跳转到的菜单的路径 该路径为layoutpages下的文件子路径
 * @param {pathId} 当前页面的路由id
 * @param {menuList} 所有注册过的路由列表
 * @param {proxy} vue实例
 * @return {name} 跳转路由的name值
 */
export const findName = (btnName, toPathUrl, pathId, menuList, proxy) => {
    let toId = "";
    let _item = XE.findTree(menuList, (item) => item.id == pathId);
    if (
        _item &&
        _item.item &&
        _item.item.children &&
        _item.item.children.length > 0
    ) {
        let btn = _item.item.children.find((item) => item.menu == btnName);

        btn && (toId = btn.toPath);
    }
    if (toId != "") {
        let _toItem = XE.findTree(menuList, (item) => item.id == toId);
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
    proxy.$message({
        type: "error",
        message: "无法跳转,请联系系统管理员!",
    });
};

/**
 * @description:根据权限动态添加路由
 * @param {title} 标题名称
 * @param {path} 组件路径 layoutpages下的组件路径
 * @param {name} 按钮key值
 * @param {{ router, route }} 路由对象
 * @return {_route.name} 返回注册后的name值
 */
export const getAsyncRouteName = async (
    title,
    path,
    name,
    { router, route }
) => {
    const AsyncComponent = defineAsyncComponent(() =>
        import("@/views/layoutpages/" + path + ".vue")
    );
    const app = {
        components: {
            FunctionPage,
            AsyncComponent,
        },
        data: () => ({
            rName: null,
        }),
        methods: {
            reload(e) {
                return (e.returnValue = "");
            },
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
        },
    };
    const _route = {
        name: route.name + "/" + name,
        path: route.name + "/" + name,

        component: app,
    };
    await router.addRoute("AppMain", _route);
    return _route.name;
};
