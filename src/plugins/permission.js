/*
 * @Author: your name
 * @Date: 2021-01-13 17:32:55
 * @LastEditTime: 2021-01-14 13:30:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\plugins\jurisdiction.js
 */
let sync_routes = {};
const files = require.context("../views/layoutpages", true, /\.vue$/);
files.keys().forEach(key => {
    const i = key.lastIndexOf("/");
    const fileName = key.slice(i + 1).replace(/(\.\/|\.vue)/g, "");
    sync_routes[fileName] = files.resolve(key);
});
import globalRoutes from "@/router/globalRoutes";
import mainRoutes from "@/router/mainRoutes";
import { isURL } from "@/utils/validate";

export default {
    install: (app, { router, store }) => {
        // let router = opt;
        router.beforeEach(async (to, from, next) => {
            const token = store.getters.token;
            if (
                router.options.isAddDynamicMenuRoutes ||
                fnCurrentRouteType(to, globalRoutes) === "global"
            ) {
                //* 1. 已经添加 or 全局路由, 直接访问
                if (to.meta.title) {
                    document.title = to.meta.title;
                }
                next();
            } else {
                // let token = sessionStorage.getItem("token");
                if (!token || !/\S/.test(token)) {
                    next({ name: "Login" });
                } else {
                    const data = await VE_API.user.userMenuList();
                    if (data && data.code === "00") {
                        fnAddDynamicMenuRoutes(data.list);
                        router.options.isAddDynamicMenuRoutes = true;
                        await store.dispatch("app/set_menu_list", data.list);
                        next({ ...to, replace: true });
                    } else {
                        next({ name: "Login" });
                    }
                }
            }
        });

        /**
         * 判断当前路由类型, global: 全局路由, main: 主入口路由
         * @param {*} route 当前路由
         */
        // eslint-disable-next-line no-unused-vars
        function fnCurrentRouteType(route, globalRoutes = []) {
            let temp = [];
            for (let i = 0; i < globalRoutes.length; i++) {
                if (route.path === globalRoutes[i].path) {
                    return "global";
                } else if (
                    globalRoutes[i].children &&
                    globalRoutes[i].children.length >= 1
                ) {
                    temp = temp.concat(globalRoutes[i].children);
                }
            }
            return temp.length >= 1 ? fnCurrentRouteType(route, temp) : "main";
        }

        /**
         * 添加动态(菜单)路由
         * @param {*} menuList 菜单列表
         * @param {*} routes 递归创建的动态(菜单)路由
         */
        // eslint-disable-next-line no-unused-vars
        function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
            let temp = [];
            for (let i = 0; i < menuList.length; i++) {
                if (menuList[i].children && menuList[i].children.length >= 1) {
                    temp = temp.concat(menuList[i].children);
                } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
                    const url = _.split(menuList[i].url, "/");
                    let route = {
                        path: _.toLower(_.join(url, "-")),
                        component: null,
                        name: _.last(url)
                        // meta: {
                        //     menuId: menuList[i].menuId,
                        //     title: menuList[i].name,
                        //     isDynamic: true,
                        //     isTab: true,
                        //     iframeUrl: ""
                        // }
                    };
                    // url以http[s]://开头, 通过iframe展示
                    if (isURL(menuList[i].url)) {
                        route["path"] = `i-${menuList[i].id}`;
                        route["name"] = `i-${menuList[i].id}`;
                        route["meta"]["iframeUrl"] = menuList[i].url;
                    } else {
                        const l = sync_routes[_.last(url)]
                            .replace(/(\.\/src\/|\.vue)/g, "")
                            .toString();
                        route["component"] = () => import("@/" + l + ".vue");
                    }
                    routes.push(route);
                }
            }
            if (temp.length >= 1) {
                fnAddDynamicMenuRoutes(temp, routes);
            } else {
                // mainRoutes.children = mainRoutes.children.concat(routes);
                mainRoutes.children = routes;
                console.log(
                    "控制台打印--> ~ file: permission.js ~ line 127 ~ fnAddDynamicMenuRoutes ~ mainRoutes.children",
                    mainRoutes.children
                );

                router.addRoute(mainRoutes);
                // , { path: "*", redirect: { name: "404" } }]
            }
        }
    }
};
