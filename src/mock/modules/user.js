/*
 * @Author: your name
 * @Date: 2021-01-05 10:50:33
 * @LastEditTime: 2021-02-08 17:12:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_3.0_test\src\mock\user.js
 */
const Mock = require("mockjs"); //引入
const menuItem = Mock.mock({
    code: "00",
    message: "查询成功!",
    list: [
        {
            id: 100,
            name: "系统设置", //看官网，这个名字是3-5之间的
            children: [
                {
                    id: 101,
                    name: "用户管理", //看官网，这个名字是3-5之间的
                    url: "system/Users" //这个类似上面的id一个，只是初始值是从100开始的
                },
                {
                    id: 102,
                    name: "菜单管理", //看官网，这个名字是3-5之间的
                    url: "system/Menus" //这个类似上面的id一个，只是初始值是从100开始的
                },
                {
                    id: 103,
                    name: "角色管理", //看官网，这个名字是3-5之间的
                    url: "system/Roles" //这个类似上面的id一个，只是初始值是从100开始的
                }
            ]
        },
        {
            id: 1,
            name: "标签一", //看官网，这个名字是3-5之间的
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
                    url: "label4/Label41" //这个类似上面的id一个，只是初始值是从100开始的
                },
                {
                    id: 6,
                    name: "标签四二", //看官网，这个名字是3-5之间的
                    url: "label4/Label42" //这个类似上面的id一个，只是初始值是从100开始的
                }
            ]
        },
        {
            id: 7,
            name: "标签五", //看官网，这个名字是3-5之间的
            children: [
                {
                    id: 8,
                    name: "标签五一", //看官网，这个名字是3-5之间的
                    url: "label4/Label41" //这个类似上面的id一个，只是初始值是从100开始的
                },
                {
                    id: 9,
                    name: "标签五二", //看官网，这个名字是3-5之间的
                    url: "label4/Label42" //这个类似上面的id一个，只是初始值是从100开始的
                }
            ]
        }
    ]
});
module.exports = {
    login: {
        url: "/login",
        type: "post",
        mock: true,
        response: () => {
            return {
                code: "00",
                message: "登录成功!",
                token: new Date().getTime()
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
// module.exports = user;
