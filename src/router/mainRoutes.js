/*
 * @Author: your name
 * @Date: 2021-01-13 17:39:02
 * @LastEditTime: 2021-01-18 15:48:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\router\mainRoutes.js
 */
export default {
    path: "/",
    name: "AppMain",
    component: () => import("@/views/AppMain.vue"),
    redirect: { name: "Home" },
    children: [
        {
            path: "home",
            name: "Home",
            component: () => import("@/views/Home.vue"),
        },
    ],
};
