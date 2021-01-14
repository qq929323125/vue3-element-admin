/*
 * @Author: your name
 * @Date: 2021-01-07 11:41:32
 * @LastEditTime: 2021-01-13 17:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
// import sync_routes from "./allRoute";
import globalRoutes from "./globalRoutes";
import mainRoutes from "./mainRoutes";
// const globalRoutes = [
//     {
//         path: "/login",
//         name: "Login",
//         component: () => import("@/views/Login.vue")
//     }
// ];
// const mainRoutes = {
//     path: "/",
//     name: "AppMain",
//     component: () => import("@/views/AppMain.vue"),
//     redirect: { name: "Label1" },
//     children: [
//         {
//             path: "label1",
//             name: "Label1",
//             component: () => import("@/views/layoutpages/Label1.vue")
//         }
//     ]
// };

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
});
export default router;

// router.beforeEach(async (to, from, next) => {
//     //* 添加动态(菜单)路由
//     //* 2. 获取菜单列表, 添加并保存本地存储

//     if (
//         router.options.isAddDynamicMenuRoutes ||
//         fnCurrentRouteType(to, globalRoutes) === "global"
//     ) {
//         //* 1. 已经添加 or 全局路由, 直接访问
//         if (to.meta.title) {
//             document.title = to.meta.title;
//         }
//         next();
//     } else {
//         let token = sessionStorage.getItem("token");
//         if (!token || !/\S/.test(token)) {
//             next({ name: "Login" });
//         } else {
//             // let img=require('../assets/img/login_bg.jpg')
//             // window.navLoading = Loading.service({
//             //     text: "正在拼命加载中...",
//             //     customClass: "site-loading-bg-img"
//             // });
//             const data = await VE_API.user.userMenuList();
//             if (data && data.code === "00") {
//                 fnAddDynamicMenuRoutes(data.list);
//                 router.options.isAddDynamicMenuRoutes = true;
//                 sessionStorage.setItem(
//                     "menuList",
//                     JSON.stringify(data.menuList || "[]")
//                 );
//                 next({ ...to, replace: true });
//             } else {
//                 next({ name: "Login" });
//             }
//             // VE.menuNav({ a: 1111 })
//             //     .then(({ data }) => {
//             //         // debugger
//             //     })
//             //     .catch(e => {
//             //         Message.closeAll();
//             //         window.navLoading.close();
//             //         Message.error("权限获取失败,请重新登陆!");
//             //         // console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
//             //         router.push({ name: "login" });
//             //     });
//         }
//     }
// });

// /**
//  * 判断当前路由类型, global: 全局路由, main: 主入口路由
//  * @param {*} route 当前路由
//  */
// // eslint-disable-next-line no-unused-vars
// function fnCurrentRouteType(route, globalRoutes = []) {
//     var temp = [];
//     for (var i = 0; i < globalRoutes.length; i++) {
//         if (route.path === globalRoutes[i].path) {
//             return "global";
//         } else if (
//             globalRoutes[i].children &&
//             globalRoutes[i].children.length >= 1
//         ) {
//             temp = temp.concat(globalRoutes[i].children);
//         }
//     }
//     return temp.length >= 1 ? fnCurrentRouteType(route, temp) : "main";
// }

// /**
//  * 添加动态(菜单)路由
//  * @param {*} menuList 菜单列表
//  * @param {*} routes 递归创建的动态(菜单)路由
//  */
// // eslint-disable-next-line no-unused-vars
// function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
//     var temp = [];
//     for (var i = 0; i < menuList.length; i++) {
//         if (menuList[i].children && menuList[i].children.length >= 1) {
//             temp = temp.concat(menuList[i].children);
//         } else if (menuList[i].name && /\S/.test(menuList[i].name)) {
//             // menuList[i].url = menuList[i].url.replace(/^\//, "");
//             var route = {
//                 path: _.toLower(menuList[i].name),
//                 component: null,
//                 name: menuList[i].name
//                 // meta: {
//                 //     menuId: menuList[i].menuId,
//                 //     title: menuList[i].name,
//                 //     isDynamic: true,
//                 //     isTab: true,
//                 //     iframeUrl: ""
//                 // }
//             };
//             // url以http[s]://开头, 通过iframe展示
//             // if (isURL(menuList[i].url)) {
//             //     route["path"] = `/i-${menuList[i].menuId}`;
//             //     route["name"] = `i-${menuList[i].menuId}`;
//             //     route["meta"]["iframeUrl"] = menuList[i].url;
//             // } else {
//             // }
//             // eslint-disable-next-line no-unused-vars
//             let r = sync_routes[menuList[i].name]
//                 .toString()
//                 .replace(/(\.\/src\/|\.vue)/g, "");
//             route["component"] = () => import("@/" + r + ".vue");
//             // route["component"] = resolve =>
//             //     require(["@/" + r + ".vue"], resolve);
//             // resolve => require(["@/" + r + ".vue"], resolve);
//             // try {
//             //     // _import(`modules/${menuList[i].url}`) || null;
//             //     // eslint-disable-next-line no-empty
//             // } catch (e) {}
//             routes.push(route);
//         }
//     }
//     if (temp.length >= 1) {
//         fnAddDynamicMenuRoutes(temp, routes);
//     } else {
//         // mainRoutes.name = "main-dynamic";
//         // mainRoutes.children = mainRoutes.children.concat(routes)
//         mainRoutes.children = routes;
//         // debugger

//         router.addRoute(mainRoutes);
//         // , { path: "*", redirect: { name: "404" } }]
//         // sessionStorage.setItem(
//         //     "dynamicMenuRoutes",
//         //     JSON.stringify(mainRoutes.children || "[]")
//         // );
//         console.log("\n");
//         console.log(
//             "%c!<-------------------- 动态(菜单)路由 s -------------------->",
//             "color:blue"
//         );
//         console.log(mainRoutes.children);
//         console.log(
//             "%c!<-------------------- 动态(菜单)路由 e -------------------->",
//             "color:blue"
//         );
//     }
// }
