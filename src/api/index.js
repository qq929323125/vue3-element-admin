/*
 * @Author: your name
 * @Date: 2021-01-05 10:19:11
 * @LastEditTime: 2021-02-07 12:01:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\mock\index.js
 */
const path = require("path");
const fs = require("fs");
const getPathInfo = (p) => path.parse(p);

/**
 * @description // 递归读取文件，类似于webpack的require.context()
 *
 * @param {String} directory 文件目录
 * @param {Boolean} useSubdirectories 是否查询子目录，默认false
 * @param {array} extList 查询文件后缀，默认 ['.js']
 *
 */
function autoLoadFile(directory, useSubdirectories = false, extList = [".js"]) {
    const filesList = {};
    // 递归读取文件
    function readFileList(directory, useSubdirectories, extList) {
        const files = fs.readdirSync(directory);
        files.forEach((item) => {
            const fullPath = path.join(directory, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory() && useSubdirectories) {
                readFileList(
                    path.join(directory, item),
                    useSubdirectories,
                    extList
                );
            } else {
                const info = getPathInfo(fullPath);

                if (extList.includes(info.ext)) {
                    filesList[info.name] = require(fullPath);
                }
            }
        });
    }
    readFileList(directory, useSubdirectories, extList);

    return filesList;
}

module.exports = autoLoadFile(path.join(__dirname, "./modules"));
