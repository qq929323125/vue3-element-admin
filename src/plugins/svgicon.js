/*
 * @Author: your name
 * @Date: 2021-08-13 15:48:48
 * @LastEditTime: 2021-08-13 16:11:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\plugins\svgicon.js
 */
import * as components from "@element-plus/icons";
export default {
    install: (app) => {
        for (const key in components) {
            const componentConfig = components[key];
            app.component(componentConfig.name, componentConfig);
        }
    },
};
