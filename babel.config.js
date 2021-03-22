/*
 * @Author: your name
 * @Date: 2021-01-07 09:49:29
 * @LastEditTime: 2021-03-22 10:43:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\babel.config.js
 */
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [
        [
            "component",
            {
                libraryName: "element-plus",
                styleLibraryName: "theme-chalk"
            }
        ],
        "@vue/babel-plugin-jsx"
        // "@babel/plugin-syntax-dynamic-import",
        // "syntax-dynamic-import",
        // "dynamic-import-node"
    ]
};
