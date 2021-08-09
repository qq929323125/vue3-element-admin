/*
 * @Author: your name
 * @Date: 2021-01-13 17:37:21
 * @LastEditTime: 2021-01-18 09:45:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\router\globalRoutes.js
 */
export default [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue"),
    },
];
