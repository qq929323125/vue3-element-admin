/*
 * @Author: your name
 * @Date: 2021-01-07 11:41:32
 * @LastEditTime: 2021-12-02 17:08:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\store\index.js
 */
let modules = {};
const files = require.context("./modules", true, /index.js$/);
files.keys().forEach((key) => {
    const fileName = key.split("/")[1];
    modules[fileName] = files(key).default;
});

import { createStore } from "vuex";
import getters from "./getters";
export default createStore({
    getters,
    modules,
});
