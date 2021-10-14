/*
 * @Author: your name
 * @Date: 2021-01-07 10:51:26
 * @LastEditTime: 2021-10-14 16:13:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\plugins\element.js
 */

import ElementPlus from "element-plus";

import "dayjs/locale/zh-cn";
import "element-plus/theme-chalk/src/index.scss";
export default {
    install: (app) => {
        app.use(ElementPlus);
        app.config.globalProperties.$ELEMENT = { size: "medium" };
    },
};
