/*
 * @Author: your name
 * @Date: 2021-03-02 15:29:31
 * @LastEditTime: 2021-03-12 15:57:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\plugins\mock.js
 */
export default {
    install: (app, { router, store }) => {
        const files = require.context("@/directives/modules", false, /\.js$/);
        files.keys().forEach(key => {
            let name = key.replace(/(\.\/|\.js)/g, "");
            let method = files(key).default;
            app.directive(name, (el, binding) =>
                method(el, binding, router, store)
            );
        });
    }
};
