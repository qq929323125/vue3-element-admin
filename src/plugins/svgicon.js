/*
 * @Author: your name
 * @Date: 2021-08-13 15:48:48
 * @LastEditTime: 2022-01-20 10:35:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\plugins\svgicon.js
 */
import * as components from "@element-plus/icons-vue";
export default {
    install: (app) => {
        for (const key in components) {
            const componentConfig = components[key];
            app.component(componentConfig.name, componentConfig);
        }
    },
};
