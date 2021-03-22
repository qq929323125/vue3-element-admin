/*
 * @Author: your name
 * @Date: 2021-03-02 15:29:31
 * @LastEditTime: 2021-03-17 15:46:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\plugins\mock.js
 */
export default {
    install: () => {
        const setting = require("@/setting");
        if (setting.pro_mock && VE_ENV.MODE === "production") {
            const Mock = require("mockjs"); //引入

            const files = require.context("@/api/modules", false, /\.js$/);
            files.keys().forEach(key => {
                let obj = files(key);
                Object.keys(obj).forEach(item => {
                    Mock.mock(
                        obj[item].url,
                        obj[item].type,
                        obj[item].response
                    );
                });
            });
        }
    }
};
