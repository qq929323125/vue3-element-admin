/*
 * @Author: your name
 * @Date: 2020-10-16 11:31:18
 * @LastEditTime: 2021-01-07 10:06:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\api\index.js
 */

import _axios from "@/plugins/axios";
const method = {
    post: (url, p) => _axios.post(url, p),
    get: (url, p) => _axios.get(url, { params: p })
};

let api = {};
const files = require.context("../mock/modules", false, /\.js$/);
files.keys().forEach(key => {
    const fileName = key.replace(/(\.\/|\.js)/g, "");
    api[fileName] = {};
    let obj = files(key);
    Object.keys(obj).forEach(item => {
        api[fileName][item] = p => method[obj[item].type](obj[item].url, p);
    });
});

export default {
    install: (app, opt = "api") => {
        // window[opt] = api;
        Object.defineProperties(app.config.globalProperties, {
            [opt]: {
                get() {
                    return api;
                }
            }
        });
    }
};
