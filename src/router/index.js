/*
 * @Author: your name
 * @Date: 2021-01-07 11:41:32
 * @LastEditTime: 2021-01-07 16:13:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "AppMain",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "appmain" */ "@/views/AppMain.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
