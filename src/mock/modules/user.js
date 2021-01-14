/*
 * @Author: your name
 * @Date: 2021-01-05 10:50:33
 * @LastEditTime: 2021-01-14 11:26:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\mock\user.js
 */
const Mock = require("mockjs"); //引入
const menuItem = Mock.mock({
    code: "00",
    list: [
        {
            id: 1,
            name: "标签-", //看官网，这个名字是3-5之间的
            url: "Label1" //这个类似上面的id一个，只是初始值是从100开始的
        },
        {
            id: 2,
            name: "标签二", //看官网，这个名字是3-5之间的
            url: "Label2" //这个类似上面的id一个，只是初始值是从100开始的
        },
        {
            id: 3,
            name: "标签三", //看官网，这个名字是3-5之间的
            url: "Label3" //这个类似上面的id一个，只是初始值是从100开始的
        },
        {
            id: 4,
            name: "标签四", //看官网，这个名字是3-5之间的
            children: [
                {
                    id: 5,
                    name: "标签四一", //看官网，这个名字是3-5之间的
                    url: "label/Label41" //这个类似上面的id一个，只是初始值是从100开始的
                },
                {
                    id: 6,
                    name: "标签四二", //看官网，这个名字是3-5之间的
                    url: "label/Label42" //这个类似上面的id一个，只是初始值是从100开始的
                }
            ]
        }
    ]
});
const user = {
    login: {
        url: "/login",
        type: "post",
        mock: true,
        response: () => {
            return {
                code: "00",
                token: "121221211"
            };
        }
    },
    userMenuList: {
        url: "/userMenuList",
        type: "post",
        mock: true,
        response: () => {
            return menuItem;
        }
    }
};
module.exports = user;
