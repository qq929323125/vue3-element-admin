/*
 * @Author: your name
 * @Date: 2021-02-07 13:40:50
 * @LastEditTime: 2021-03-12 18:08:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\mock\modules\system.js
 */
const Mock = require("mockjs"); //引入

const userList = opt => {
    const { limit, page } = opt;
    let list = "list|" + limit;
    const mockData = Mock.mock({
        page: page * 1,
        limit: limit * 1,
        total: 600,
        [list]: [
            {
                "id|+1": (page - 1) * limit,
                name: "@cname",
                userName: "@first",
                password: "@last",
                "role|0-9": 0,
                "status|0-1": 0
            }
        ]
    });
    return mockData;
};
const roleList = opt => {
    const { limit, page } = opt;
    let list = "list|" + limit;
    const mockData = Mock.mock({
        page: page * 1,
        limit: limit * 1,
        total: 10,
        [list]: [
            {
                "id|+1": (page - 1) * limit,
                name: "@cname",
                roleName: "@first",
                "status|0-1": 0
            }
        ]
    });
    return mockData;
};
const menuList = Mock.mock({
    page: 1,
    limit: 10,
    total: 9,
    list: [
        {
            parentId: -1,
            id: 100,
            name: "系统设置", //看官网，这个名字是3-5之间的
            url: "",
            menu: "",
            type: 0,
            icon: "el-icon-s-platform",
            sort: 1,
            iframe: 1,
            children: [
                {
                    parentId: 100,
                    id: 101,
                    name: "用户管理", //看官网，这个名字是3-5之间的
                    url: "system/Users", //这个类似上面的id一个，只是初始值是从100开始的
                    menu: "",
                    type: 1,
                    icon: "el-icon-user-solid",
                    sort: 2,
                    iframe: 0
                },
                {
                    parentId: 100,
                    id: 102,
                    name: "菜单管理", //看官网，这个名字是3-5之间的
                    url: "system/Menus", //这个类似上面的id一个，只是初始值是从100开始的
                    menu: "",
                    type: 1,
                    icon: "el-icon-s-order",
                    sort: 1,
                    iframe: 0,
                    children: [
                        {
                            parentId: 102,
                            id: 201,
                            name: "查询", //看官网，这个名字是3-5之间的
                            url: "", //这个类似上面的id一个，只是初始值是从100开始的
                            menu: "search",
                            type: 2,
                            icon: "",
                            sort: 1,
                            iframe: 1
                        },
                        {
                            parentId: 102,
                            id: 705,
                            name: "添加子级", //看官网，这个名字是3-5之间的
                            url: "", //这个类似上面的id一个，只是初始值是从100开始的
                            menu: "addChild",
                            type: 2,
                            icon: "",
                            sort: 1,
                            iframe: 1
                        },
                        {
                            parentId: 102,
                            id: 605,
                            name: "添加子级", //看官网，这个名字是3-5之间的
                            url: "", //这个类似上面的id一个，只是初始值是从100开始的
                            menu: "addChild",
                            type: 2,
                            icon: "",
                            sort: 1,
                            iframe: 1
                        },
                        {
                            parentId: 102,
                            id: 505,
                            name: "添加子级", //看官网，这个名字是3-5之间的
                            url: "", //这个类似上面的id一个，只是初始值是从100开始的
                            menu: "addChild",
                            type: 2,
                            icon: "",
                            sort: 1,
                            iframe: 1
                        },
                        {
                            parentId: 102,
                            id: 405,
                            name: "添加子级", //看官网，这个名字是3-5之间的
                            url: "", //这个类似上面的id一个，只是初始值是从100开始的
                            menu: "addChild",
                            type: 2,
                            icon: "",
                            sort: 1,
                            iframe: 1
                        },
                        {
                            parentId: 102,
                            id: 805,
                            name: "添加子级", //看官网，这个名字是3-5之间的
                            url: "", //这个类似上面的id一个，只是初始值是从100开始的
                            menu: "addChild",
                            type: 2,
                            icon: "",
                            sort: 1,
                            iframe: 1
                        },
                        {
                            parentId: 102,
                            id: 305,
                            name: "添加子级", //看官网，这个名字是3-5之间的
                            url: "", //这个类似上面的id一个，只是初始值是从100开始的
                            menu: "addChild",
                            type: 2,
                            icon: "",
                            sort: 1,
                            iframe: 1
                        }
                    ]
                },
                {
                    parentId: 100,
                    id: 103,
                    name: "角色管理", //看官网，这个名字是3-5之间的
                    url: "system/Roles", //这个类似上面的id一个，只是初始值是从100开始的
                    menu: "",
                    type: 1,
                    icon: "el-icon-s-check",
                    sort: 3,
                    iframe: 0
                }
            ]
        },
        {
            parentId: -1,
            id: 4,
            name: "参考资料", //看官网，这个名字是3-5之间的
            url: "",
            menu: "",
            type: 0,
            icon: "el-icon-s-order",
            sort: 1,
            iframe: 1,
            children: [
                {
                    parentId: 4,
                    id: 5,
                    name: "vue3.0", //看官网，这个名字是3-5之间的
                    url: "https://www.vue3js.cn/docs/zh/", //这个类似上面的id一个，只是初始值是从100开始的
                    menu: "",
                    type: 1,
                    icon: "el-icon-s-promotion",
                    sort: 1,
                    iframe: 1
                },
                {
                    parentId: 4,
                    id: 6,
                    name: "element-plus", //看官网，这个名字是3-5之间的
                    url: "https://element-plus.org/#/zh-CN", //这个类似上面的id一个，只是初始值是从100开始的
                    menu: "",
                    type: 1,
                    icon: "el-icon-eleme",
                    sort: 1,
                    iframe: 1
                }
            ]
        }
    ]
});
module.exports = {
    userList: {
        url: "/userList",
        type: "post",
        mock: true,
        response: opt => {
            return {
                message: "查询成功!",
                code: "00",
                data: userList(opt.body)
            };
        }
    },
    menuList: {
        url: "/menuList",
        type: "post",
        mock: true,
        response: () => {
            return {
                message: "查询成功!",
                code: "00",
                data: menuList
            };
        }
    },
    roleList: {
        url: "/roleList",
        type: "post",
        mock: true,
        response: opt => {
            return {
                message: "查询成功!",
                code: "00",
                data: roleList(opt.body)
            };
        }
    }
};
