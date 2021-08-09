/*
 * @Author: your name
 * @Date: 2021-01-05 17:15:27
 * @LastEditTime: 2021-04-25 10:44:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\mock\mock-server.js
 */

// const bodyParser = require("body-parser");
const express = require("express");
const chokidar = require("chokidar");
const chalk = require("chalk");
const path = require("path");
const Mock = require("mockjs");
const apiDir = path.join(process.cwd(), "src/api");

// 注册mock接口路径
function registerRoutes(app) {
    let mockLastIndex;
    let mocksForServer = new Array();
    const api = require("./index.js");
    Object.keys(api).map((route) => {
        Object.keys(api[route]).map((item) => {
            api[route][item].mock &&
                mocksForServer.push(
                    responseFake(
                        api[route][item].url,
                        api[route][item].type,
                        api[route][item].response
                    )
                );
        });
    });
    // 注册接口
    for (const mock of mocksForServer) {
        app[mock.type](mock.url, mock.response);
        mockLastIndex = app._router.stack.length;
        // console.log(app._router.stack[12])
    }
    // 获取接口的长度
    const mockRoutesLength = mocksForServer.length;
    // 注意：mockRoutesLength并不等于定于路由路径的数量，还包括其他路由
    // console.log(mockRoutesLength,mockLastIndex)
    return {
        mockRoutesLength,
        mockStartIndex: mockLastIndex - mockRoutesLength,
    };
}
// 模拟mock server
const responseFake = (url, type, respond) => {
    return {
        url: url,
        type: type || "get",
        response: (req, res) => {
            console.log(chalk.red("请求", req.path));
            res.json(
                Mock.mock(
                    respond instanceof Function ? respond(req, res) : respond
                )
            );
        },
    };
};
// 移除路由
function unregisterRoutes() {
    Object.keys(require.cache).forEach((i) => {
        console.log(apiDir, i);
        if (i.includes(apiDir)) {
            delete require.cache[require.resolve(i)];
        }
    });
}

// 导出服务器app
module.exports = (app) => {
    // 解析post数据
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    // 注册路由表到app上
    const mockRoutes = registerRoutes(app);
    let mockRoutesLength = mockRoutes.mockRoutesLength;
    let mockStartIndex = mockRoutes.mockStartIndex;
    //* 观察mock下的文件变化（不包括mock-server.js），热更新文件，这样添加数据路由就不用重启了
    chokidar
        .watch(apiDir, {
            ignored: /mock-server/,
            ignoreInitial: true,
        })
        .on("all", (event, path) => {
            try {
                // 先移除之前的路由
                app._router.stack.splice(mockStartIndex, mockRoutesLength);
                // 清除缓冲
                unregisterRoutes();
                // 重新注册路由
                const mockRoutes = registerRoutes(app);
                mockRoutesLength = mockRoutes.mockRoutesLength;
                mockStartIndex = mockRoutes.mockStartIndex;
                console.log(
                    chalk.magentaBright(`\n > 接口更新成功 --> 详情  ${path}`)
                );
            } catch (err) {
                console.log(chalk.redBright(err));
            }
        });
};
