/*
 * @Author: your name
 * @Date: 2021-01-07 09:49:29
 * @LastEditTime: 2021-01-07 11:33:31
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
        ]
    ]
};
