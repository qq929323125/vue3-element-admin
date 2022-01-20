/*
 * @Author: your name
 * @Date: 2021-01-07 10:51:26
 * @LastEditTime: 2022-01-20 10:40:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\plugins\element.js
 */

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
export default {
    install: (app) => {
        app.use(ElementPlus, {
            locale: zhCn,
            size: "default",
        });
    },
};
