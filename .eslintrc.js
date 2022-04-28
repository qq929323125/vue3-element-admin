/*
 * @Author: your name
 * @Date: 2021-01-07 09:49:29
 * @LastEditTime: 2022-04-28 18:32:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\.eslintrc.js
 */
module.exports = {
    root: true,

    env: {
        node: true,
        "vue/setup-compiler-macros": true,
    },

    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/prettier",
    ],

    parserOptions: {
        parser: "@babel/eslint-parser",
    },
    // "writable" 以允许重写变量，或 "readonly" 不允许重写变量
    globals: {
        XE: "readonly",
        VE_ENV: "readonly",
        VE_API: "readonly",
    },

    rules: {
        indent: [2, 4, { SwitchCase: 1 }],
        "prettier/prettier": [2, { tabWidth: 4, endOfLine: "auto" }],
        "no-console": "off",
        "no-debugger": "off",
        "vue/multi-word-component-names": 0,
    },
};
