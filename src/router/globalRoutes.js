/*
 * @Author: your name
 * @Date: 2021-01-13 17:37:21
 * @LastEditTime: 2021-01-13 17:38:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\router\globalRoutes.js
 */
export default [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue")
    }
];
