/*
 * @Author: your name
 * @Date: 2020-10-16 11:31:18
 * @LastEditTime: 2021-01-08 18:07:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\api\index.js
 */

import _axios from "@/plugins/axios";
const method = {
    post: (url, p, config) => _axios.post(url, p, config),
    get: (url, p, config) =>
        _axios.get(url, Object.assign(config, { params: p }))
};

let api = {};
const files = require.context("../mock/modules", false, /\.js$/);
files.keys().forEach(key => {
    const fileName = key.replace(/(\.\/|\.js)/g, "");
    api[fileName] = {};
    let obj = files(key);
    Object.keys(obj).forEach(item => {
        api[fileName][item] = (p, config = {}) =>
            method[obj[item].type](obj[item].url, p, config);
    });
});

export default {
    install: (app, opt = "_api") => {
        window[opt] = api;
        Object.defineProperties(app.config.globalProperties, {
            [opt]: {
                get() {
                    return api;
                }
            }
        });
    }
};
