/* eslint-disable indent */
/*
 * @Author: your name
 * @Date: 2020-10-16 10:38:49
 * @LastEditTime: 2021-12-02 15:50:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\plugins\axios.js
 */
"use strict";

import axios from "axios";
import Qs from "qs";
import NProgress from "nprogress";
import { SET_TOKEN } from "@/store/modules/app/type";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const install = (app, { router, store, opt }) => {
    let config = {
        Global: true,
        // baseURL: process.env.baseURL || process.env.apiUrl || ""
        // timeout: 60 * 1000, // Timeout
        // withCredentials: true, // Check cross-site Access-Control
        // {"userName":"Administrator","pwd":"123456"}
        // userName=Administrator&pwd=123456
    };
    if (VE_ENV.MODE === "production") {
        config.transformRequest = [(data) => Qs.parse(data)];
    }

    const _axios = axios.create(config);
    let ve_loading;
    let ve_message = null;
    let loadingCount = 0;
    // 请求拦截
    _axios.interceptors.request.use(
        (config) => {
            console.log(config);

            NProgress.done();
            if (config.Global) {
                NProgress.start();
                ve_loading = app.config.globalProperties.$loading({
                    lock: true,
                    text: "Loading",
                    spinner: "el-icon-loading",
                    background: "rgba(0,0,0,0.1)",
                });
            }
            loadingCount++;
            //*请求头添加token
            const token = store.getters.token;
            token && (config.headers.Authorization = token);

            // Do something before request is sent
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    // 响应拦截
    _axios.interceptors.response.use(
        (response) => {
            // TODO 根据响应头更新token
            store.dispatch(`app/${SET_TOKEN}`, new Date().getTime());

            loadingCount--;
            if (loadingCount <= 0) {
                NProgress.done();
                ve_loading.close();
            }

            let type = "success";
            if (response.data.code != "00") {
                type = "error";
            }
            if (ve_message) {
                ve_message.close();
                ve_message = null;
            }
            ve_message = app.config.globalProperties.$message({
                type,
                message: response.data.message,
            });
            // Do something with response data
            return response.data;
        },
        (error) => {
            loadingCount--;
            if (loadingCount <= 0) {
                NProgress.done();
                ve_loading.close();
            }
            if (error && error.response) {
                let message = "";
                switch (error.response.status) {
                    case 400:
                        message = "请求错误";
                        break;
                    case 401: {
                        message = "未授权，请登录";
                        router.replace({
                            name: "Login",
                        });
                        break;
                    }
                    case 403:
                        message = "没有权限，拒绝访问";
                        break;
                    case 404:
                        message = `请求地址出错`;
                        break;
                    case 408:
                        message = "请求超时";
                        break;
                    case 500:
                        message = "服务器内部错误";
                        break;
                    case 501:
                        message = "服务未实现";
                        break;
                    case 502:
                        message = "网关错误";
                        break;
                    case 503:
                        message = "服务不可用";
                        break;
                    case 504:
                        message = "网关超时";
                        break;
                    case 505:
                        message = "HTTP版本不受支持";
                        break;
                    default:
                        break;
                }
                if (ve_message) {
                    ve_message.close();
                    ve_message = null;
                }
                ve_message = app.config.globalProperties.$message({
                    message,
                    type: "error",
                });
            }
            // Do something with response error
            return Promise.reject(error);
        }
    );

    const method = {
        post: (url, p, config) => _axios.post(url, p, config),
        get: (url, p, config) =>
            _axios.get(url, Object.assign(config, { params: p })),
    };

    let api = {};
    const files = require.context("@/api/modules", false, /\.js$/);
    files.keys().forEach((key) => {
        const fileName = key.replace(/(\.\/|\.js)/g, "");
        api[fileName] = {};
        let obj = files(key);
        Object.keys(obj).forEach((item) => {
            api[fileName][item] = (p, config = {}) =>
                method[obj[item].type](obj[item].url, p, config);
        });
    });

    window[opt] = api;
    app.config.globalProperties[opt] = api;
};

export default { install };
