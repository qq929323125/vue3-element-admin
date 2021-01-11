/*
 * @Author: your name
 * @Date: 2020-10-14 15:24:16
 * @LastEditTime: 2021-01-11 13:46:26
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
                VE_ENV: {
                    MODE: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ]
    },

    // pluginOptions: {
    //     "style-resources-loader": {
    //         preProcessor: "scss",
    //         patterns: [path.resolve(__dirname, `./src/styles/imports.scss`)] //path.resolve(__dirname, `"./src/styles/imports.scss";`)
    //     }
    // }
    css: {
        loaderOptions: {
            scss: {
                // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
                additionalData: `@import "~@/styles/imports.scss";`
            }
        }
    }
};
