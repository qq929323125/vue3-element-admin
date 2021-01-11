/*
 * @Author: your name
 * @Date: 2021-01-07 11:41:32
 * @LastEditTime: 2021-01-11 10:05:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\store\index.js
 */
let modules = {};
const files = require.context("./modules", false, /\.js$/);
files.keys().forEach(key => {
    const fileName = key.replace(/(\.\/|\.js)/g, "");
    modules[fileName] = files(key).default;
});

import { createStore } from "vuex";
import getters from "./getters";
export default createStore({
    getters,
    modules
});
