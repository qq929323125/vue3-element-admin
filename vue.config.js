/*
 * @Author: your name
 * @Date: 2020-10-14 15:24:16
 * @LastEditTime: 2021-01-07 10:33:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\vue.config.js
 */
const setting = require("./src/setting");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    publicPath: "./",
    devServer: {
        before: app => {
            if (setting.dev_mock) {
                const fn = require("./src/mock/mock-server.js");
                fn(app);
            }
        }
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/styles/imports.styl")]
        }
    },
    chainWebpack: config => {
        config.plugin("provide").use(webpack.ProvidePlugin, [
            {
                _: "lodash"
            }
        ]);
        config.resolve.alias.set("@", path.join(__dirname, "src"));
        // .set("api", path.join(__dirname, "this.api"));
    },
    configureWebpack: {
        externals: {
            // lodash: "_"
        },
        plugins: [
            // 定义全局变量  https://www.webpackjs.com/plugins/define-plugin/
            new webpack.DefinePlugin({
                API: "this.api",
                ENV: {
                    MODE: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ]
    }
};
