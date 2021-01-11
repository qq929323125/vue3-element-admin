/*
 * @Author: your name
 * @Date: 2020-10-16 10:38:49
 * @LastEditTime: 2021-01-11 16:25:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\plugins\axios.js
 */
"use strict";

import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const install = (app, opt = "VE_API") => {
    let config = {
        // baseURL: process.env.baseURL || process.env.apiUrl || ""
        // timeout: 60 * 1000, // Timeout
        // withCredentials: true, // Check cross-site Access-Control
    };

    const _axios = axios.create(config);

    _axios.interceptors.request.use(
        function(config) {
            // Do something before request is sent
            return config;
        },
        function(error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    _axios.interceptors.response.use(
        function(response) {
            // Do something with response data
            return response.data;
        },
        function(error) {
            // Do something with response error
            return Promise.reject(error);
        }
    );

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

    window[opt] = api;
    // Object.defineProperties(app.config.globalProperties, {
    //     [opt]: {
    //         get() {
    //             return api;
    //         }
    //     }
    // });
};

export default { install };
