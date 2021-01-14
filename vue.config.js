/*
 * @Author: your name
 * @Date: 2020-10-14 15:24:16
 * @LastEditTime: 2021-01-14 13:13:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\vue.config.js
 */
const setting = require("./src/setting");
const webpack = require("webpack");

module.exports = {
    publicPath: "",

    devServer: {
        before: app => {
            if (setting.dev_mock) {
                const mock_server = require("./src/mock/mock-server.js");
                mock_server(app);
            }
        }
    },

    chainWebpack: config => {
        config.plugin("provide").use(webpack.ProvidePlugin, [
            {
                _: "lodash"
            }
        ]);
        config.plugin("define").use(webpack.DefinePlugin, [
            {
                VE_ENV: {
                    MODE: JSON.stringify(process.env.NODE_ENV)
                }
            }
        ]);
        config.plugins.delete("hash-module-ids");
    },

    configureWebpack: () => {
        let baseConfig = {};
        let envConfig = {};
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            envConfig = {
                optimization: {
                    moduleIds: "named"
                    // chunkIds: "named"
                },
                externals: {
                    // lodash: "_"
                }
            };
        }
        return Object.assign(baseConfig, envConfig);
    },

    css: {
        loaderOptions: {
            scss: {
                // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
                additionalData: `@import "~@/styles/imports.scss";`
            }
        }
    }
};
