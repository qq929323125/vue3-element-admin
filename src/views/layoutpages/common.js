/*
 * @Author: your name
 * @Date: 2021-02-07 17:11:28
 * @LastEditTime: 2021-08-18 17:51:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\layoutpages\common.js
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
    params.page = 1;
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
    const FunctionPage = require("@/components/FunctionPage.vue").default;
    const AsyncComponent = require("@/views/layoutpages/" +
        path +
        ".vue").default;
    // const { defineAsyncComponent } = require("vue");
    // const AsyncComponent = defineAsyncComponent(() =>
    //     import("@/views/layoutpages/" + path + ".vue")
    // );
    // import { defineAsyncComponent } from "vue";
    // import FunctionPage from "@/components/FunctionPage";

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
