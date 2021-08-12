/*
 * @Author: your name
 * @Date: 2021-08-12 17:08:17
 * @LastEditTime: 2021-08-12 17:21:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\veBaseComponents\index.js
 */
export default {
    install: (app) => {
        const files = require.context(
            "@/components/veBaseComponents",
            false,
            /\.vue$/
        );
        files.keys().forEach((key) => {
            // 获取组件配置
            const componentConfig = files(key);
            // 全局注册组件
            app.component(
                componentConfig.default.name,
                componentConfig.default
            );
        });
    },
};
