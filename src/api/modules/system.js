/*
 * @Author: your name
 * @Date: 2021-02-07 13:40:50
 * @LastEditTime: 2021-12-02 15:59:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\api\modules\system.js
 */
// const Mock = require("mockjs"); //引入
/**
 * @description: 列表查询
 * @param {*}
 * @return {*}
 */
const searchList = (sRole, sLimit, sPage, sList, sName) => {
    let list = sList;
    if (sRole !== null && sRole !== "" && sRole !== undefined) {
        list = sList.filter((item) => item[sName] + "" === sRole + "");
    }
    const res = {};
    res.total = list.length;
    res.page = sPage * 1;
    res.limit = sLimit * 1;
    res.list = list.slice((sPage - 1) * sLimit, (sPage - 1) * sLimit + sLimit);
    return {
        message: "查询成功!",
        code: "00",
        data: res,
    };
};
/**
 * @description: 列表添加
 * @param {*}
 * @return {*}
 */
const addList = (opt, list, name, sName) => {
    const flag = list.some((item) => {
        if (item.type != "undefined") {
            if (item.type == 2) {
                return false;
            }
        }
        return item[sName] == name;
    });
    let res = {
        message: "添加成功!",
        code: "00",
    };
    if (flag) {
        res = {
            message: "名称已存在",
            code: "01",
        };
    } else {
        let item = {
            id: list[list.length - 1].id + 1,
            ...opt.body,
        };
        list.push(item);
    }
    return res;
};
/**
 * @description:编辑列表
 * @param {*}
 * @return {*}
 */
const editList = (opt, list) => {
    const {
        body: { id },
    } = opt;
    if (id == -1) {
        return {
            message: "系统超级管理员账户不能编辑!",
            code: "01",
        };
    }
    const index = list.indexOf(list.find((item) => item.id + "" === id + ""));
    list.fill(opt.body, index, index + 1);
    return {
        message: "编辑成功!",
        code: "00",
    };
};
/**
 * @description:删除列表
 * @param {*}
 * @return {*}
 */
const delList = (opt, list) => {
    const {
        body: { id },
    } = opt;
    if (id == -1) {
        return {
            message: "系统超级管理员账户不能删除!",
            code: "01",
        };
    }
    const index = list.indexOf(list.find((item) => item.id + "" === id + ""));
    list.splice(index, 1);
    return {
        message: "删除成功!",
        code: "00",
    };
};
const menuList = [
    {
        parentId: -1,
        id: 100,
        name: "系统设置", //看官网，这个名字是3-5之间的
        url: "",
        menu: "",
        type: 0,
        icon: "Setting",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 100,
        id: 1,
        name: "用户管理", //看官网，这个名字是3-5之间的
        url: "system/Users", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "",
        type: 1,
        icon: "UserFilled",
        sort: 2,
        iframe: 0,
    },
    {
        parentId: 1,
        id: 2,
        name: "查询", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "search",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 1,
        id: 3,
        name: "添加", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "add",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 1,
        id: 4,
        name: "编辑", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "edit",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 100,
        id: 5,
        name: "菜单管理", //看官网，这个名字是3-5之间的
        url: "system/Menus", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "",
        type: 1,
        icon: "Menu",
        sort: 1,
        iframe: 0,
    },
    {
        parentId: 5,
        id: 6,
        name: "查询", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "search",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 5,
        id: 7,
        name: "添加", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "add",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 5,
        id: 8,
        name: "编辑", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "edit",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 5,
        id: 9,
        name: "添加子级", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "addChild",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 5,
        id: 10,
        name: "添加按钮", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "addBtn",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 100,
        id: 11,
        name: "角色管理", //看官网，这个名字是3-5之间的
        url: "system/Roles", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "",
        type: 1,
        icon: "HelpFilled",
        sort: 3,
        iframe: 0,
    },
    {
        parentId: 11,
        id: 12,
        name: "查询", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "search",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 11,
        id: 13,
        name: "添加", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "add",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 11,
        id: 14,
        name: "编辑", //看官网，这个名字是3-5之间的
        url: "", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "edit",
        type: 2,
        icon: "",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: -1,
        id: 15,
        name: "参考资料", //看官网，这个名字是3-5之间的
        url: "",
        menu: "",
        type: 0,
        icon: "DocumentCopy",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 15,
        id: 16,
        name: "vue3.0", //看官网，这个名字是3-5之间的
        url: "https://www.vue3js.cn/docs/zh/", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "",
        type: 1,
        icon: "Promotion",
        sort: 1,
        iframe: 1,
    },
    {
        parentId: 15,
        id: 17,
        name: "element-plus", //看官网，这个名字是3-5之间的
        url: "https://element-plus.org/#/zh-CN", //这个类似上面的id一个，只是初始值是从100开始的
        menu: "",
        type: 1,
        icon: "ElemeFilled",
        sort: 1,
        iframe: 1,
    },
];
const userList = [
    {
        id: -1,
        name: "Administrator",
        userName: "超级管理员",
        password: "123456",
        role: -1,
        status: 1,
    },
    {
        id: 0,
        name: "admin",
        userName: "管理员",
        password: "123456",
        role: 0,
        status: 1,
    },
];
const roleList = [
    {
        id: -1,
        name: "super",
        roleName: "超级管理员",
        status: "1",
        role: menuList,
    },
    {
        id: 0,
        name: "ceshi",
        roleName: "测试",
        status: "0",
        role: menuList,
    },
];

const user = {
    name: "",
    userId: "",
    roleId: "",
    menus: null,
};

module.exports = {
    userList: {
        url: "/user/list",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { role, limit, page },
            } = opt;
            return searchList(role, limit, page, userList, "role");
        },
    },
    userAdd: {
        url: "/user/add",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { name },
            } = opt;
            return addList(opt, userList, name, "name");
        },
    },
    userEdit: {
        url: "/user/edit",
        type: "post",
        mock: true,
        response: (opt) => {
            return editList(opt, userList);
        },
    },
    userDel: {
        url: "/user/del",
        type: "post",
        mock: true,
        response: (opt) => {
            return delList(opt, userList);
        },
    },
    userStatus: {
        url: "/user/status",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { id, status },
            } = opt;
            if (id == -1) {
                return {
                    message: "系统超级管理员账户不能停用!",
                    code: "01",
                };
            }
            userList.find((item) => item.id == id).status = status;
            return {
                message: "切换成功!",
                code: "00",
            };
        },
    },

    menuList: {
        url: "/menu/list",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { name },
            } = opt;
            let list = menuList;
            if (name) {
                list = menuList.filter((item) => item.name == name);
            }
            return {
                message: "查询成功!",
                code: "00",
                data: list,
            };
        },
    },
    menuAdd: {
        url: "/menu/add",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { name },
            } = opt;
            return addList(opt, menuList, name, "name");
        },
    },
    menuEdit: {
        url: "/menu/edit",
        type: "post",
        mock: true,
        response: (opt) => {
            return editList(opt, menuList);
        },
    },
    menuDel: {
        url: "/menu/del",
        type: "post",
        mock: true,
        response: (opt) => {
            return delList(opt, menuList);
        },
    },

    roleList: {
        url: "/role/list",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { name, limit, page },
            } = opt;
            return searchList(name, limit, page, roleList, "name");
        },
    },
    roleAdd: {
        url: "/role/add",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { name },
            } = opt;
            return addList(opt, roleList, name, "name");
        },
    },
    roleEdit: {
        url: "/role/edit",
        type: "post",
        mock: true,
        response: (opt) => {
            return editList(opt, roleList);
        },
    },
    roleDel: {
        url: "/role/del",
        type: "post",
        mock: true,
        response: (opt) => {
            return delList(opt, roleList);
        },
    },

    userMenuList: {
        url: "/userMenuList",
        type: "post",
        mock: true,
        response: () => {
            user.menus = roleList.find((item) => item.id == user.roleId).role;
            return {
                message: "查询成功!",
                code: "00",
                list: user.menus,
            };
        },
    },
    login: {
        url: "/login",
        type: "post",
        mock: true,
        response: (opt) => {
            const {
                body: { userName, pwd },
            } = opt;
            let data = {
                code: "00",
                message: "登录成功!",
                token: new Date().getTime(),
                uname: userName,
            };
            user.name = userName;
            let _user = userList.find((item) => item.name == user.name);
            if (!_user) {
                debugger;
                data = {
                    code: "01",
                    message: "账户不存在",
                };
            } else {
                if (_user.password !== pwd) {
                    data = {
                        code: "01",
                        message: "密码错误",
                    };
                } else {
                    if (_user.status == 0) {
                        data = {
                            code: "01",
                            message: "账户停用",
                        };
                    } else {
                        user.userId = _user.id;
                        user.roleId = _user.role;
                    }
                }
            }
            return data;
        },
    },
};
