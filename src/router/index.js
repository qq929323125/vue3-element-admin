/*
 * @Author: your name
 * @Date: 2021-01-07 11:41:32
 * @LastEditTime: 2021-01-11 11:31:19
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
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "@/views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem("token");
    if (to.name != "Login") {
        if (token) {
            next();
        } else {
            next({ name: "Login" });
        }
    } else {
        next();
    }
});

export default router;
