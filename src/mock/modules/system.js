/*
 * @Author: your name
 * @Date: 2021-02-07 13:40:50
 * @LastEditTime: 2021-02-08 17:13:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\mock\modules\system.js
 */
const Mock = require("mockjs"); //引入
const list = opt => {
    const { limit, page } = opt;
    let list = "list|" + limit;
    const mockData = Mock.mock({
        page,
        limit,
        total: 600,
        [list]: [
            {
                "id|+1": (page - 1) * limit,
                name: "@cname"
            }
        ]
    });
    return mockData;
};
module.exports = {
    userList: {
        url: "/userList",
        type: "post",
        mock: true,
        response: opt => {
            return {
                message: "查询成功!",
                code: "00",
                data: list(opt.body)
            };
        }
    }
};
