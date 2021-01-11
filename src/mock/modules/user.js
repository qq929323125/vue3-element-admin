/*
 * @Author: your name
 * @Date: 2021-01-05 10:50:33
 * @LastEditTime: 2021-01-11 17:55:01
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
            tag: "标签-", //看官网，这个名字是3-5之间的
            name: "Label1" //这个类似上面的id一个，只是初始值是从100开始的
        },
        {
            id: 2,
            tag: "标签二", //看官网，这个名字是3-5之间的
            name: "Label2" //这个类似上面的id一个，只是初始值是从100开始的
        },
        {
            id: 3,
            tag: "标签三", //看官网，这个名字是3-5之间的
            name: "Label3" //这个类似上面的id一个，只是初始值是从100开始的
        },
        {
            id: 4,
            tag: "标签四", //看官网，这个名字是3-5之间的
            name: "",
            children: [
                {
                    id: 5,
                    tag: "标签四一", //看官网，这个名字是3-5之间的
                    name: "Label41" //这个类似上面的id一个，只是初始值是从100开始的
                },
                {
                    id: 6,
                    tag: "标签四二", //看官网，这个名字是3-5之间的
                    name: "Label42" //这个类似上面的id一个，只是初始值是从100开始的
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
