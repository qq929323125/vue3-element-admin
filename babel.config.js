/*
 * @Author: your name
 * @Date: 2021-01-07 09:49:29
 * @LastEditTime: 2021-08-09 11:36:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\babel.config.js
 */
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [
        [
            "import",
            {
                libraryName: "element-plus",
                customStyleName: (name) => {
                    name = name.slice(3);
                    return `element-plus/packages/theme-chalk/src/${name}.scss`;
                },
            },
        ],
        "@vue/babel-plugin-jsx",
    ],
};
