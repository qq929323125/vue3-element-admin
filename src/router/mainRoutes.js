/*
 * @Author: your name
 * @Date: 2021-01-13 17:39:02
 * @LastEditTime: 2021-01-15 11:30:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\router\mainRoutes.js
 */
export default {
    path: "/",
    name: "AppMain",
    component: () => import("@/views/AppMain.vue"),
    redirect: { name: "Label1-1" },
    children: [
        {
            path: "Label1-1",
            name: "Label1-1",
            component: () => import("@/views/layoutpages/Label1.vue")
        }
    ]
};
