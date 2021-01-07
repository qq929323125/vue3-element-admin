/*
 * @Author: your name
 * @Date: 2020-10-16 11:31:18
 * @LastEditTime: 2021-01-07 10:09:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\api\index.js
 */

const Mock = require("mockjs"); //引入

let api = {};
const files = require.context("../mock/modules", false, /\.js$/);
files.keys().forEach(key => {
    const fileName = key.replace(/(\.\/|\.js)/g, "");
    api[fileName] = {};
    let obj = files(key);
    Object.keys(obj).forEach(item => {
        Mock.mock(obj[item].url, obj[item].type, obj[item].response);
    });
});
