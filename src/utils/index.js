/*
 * @Author: your name
 * @Date: 2021-01-12 09:38:09
 * @LastEditTime: 2022-01-20 10:37:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\utils\index.js
 */
/**
 * @description:树形结构转一维数组
 * @param {*} nodes
 * @return {*}
 */
export function jsonToArray(nodes) {
    let pid = -1;
    const toArray = (nodes) => {
        let r = [];
        if (Array.isArray(nodes)) {
            for (let i = 0, l = nodes.length; i < l; i++) {
                nodes[i].pid = pid;
                r.push(nodes[i]); // 取每项数据放入一个新数组
                if (
                    Array.isArray(nodes[i]["children"]) &&
                    nodes[i]["children"].length > 0
                ) {
                    // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
                    pid = nodes[i].id;
                    r = r.concat(toArray(nodes[i]["children"]));
                    delete nodes[i]["children"];
                }
            }
        }
        return r;
    };
    return toArray(nodes);
}

/**
 * @description:一维数组转树形结构
 * @param {*} treeArray
 * @return {*}
 */
export function arrayToJson(treeArray) {
    var r = [];
    var tmpMap = {};
    for (var i = 0, l = treeArray.length; i < l; i++) {
        //* 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
        tmpMap[treeArray[i]["id"]] = treeArray[i];
    }
    for (i = 0, l = treeArray.length; i < l; i++) {
        var key = tmpMap[treeArray[i]["pid"]];
        //*循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
        //*如果这一项数据属于哪个数据的子级
        if (key) {
            // *如果这个数据没有children
            if (!key["children"]) {
                key["children"] = [];
                key["children"].push(treeArray[i]);
                //* 如果这个数据有children
            } else {
                key["children"].push(treeArray[i]);
            }
        } else {
            //*如果没有这个Key值，就代表找不到属于哪个数据，那就代表没有父级,直接放在最外层
            r.push(treeArray[i]);
        }
    }
    return r;
}

/**
 * @description 获取节点的所有父节点
 * @param {*} tree
 * @param {*} func
 * @param {*} path
 * @return {*}
 */
export const treeFindPath = (tree, func, name = "id", path = []) => {
    if (!tree) return [];
    for (const data of tree) {
        //* 这里按照你的需求来存放最后返回的内容吧
        path.push(data[name]);
        if (func(data)) return path;
        if (data.children) {
            const findChildren = treeFindPath(data.children, func, name, path);
            if (findChildren.length) return findChildren;
        }
        path.pop();
    }
    return [];
};

/**
 * @description: 拆箱函数,解决tooltip显示问题
 * @param {*} obj
 * @return {*}
 */
export const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);

/**
 * @description:获取所有的el-svg-icon组件名
 * @param {*}
 * @return {*}
 */
export const icons = () => {
    const components = require("@element-plus/icons-vue");
    console.log("🚀 ~ file: index.js ~ line 107 ~ icons ~ e", components);

    const names = [];
    for (const key in components) {
        names.push(components[key].name);
    }
    return names;
};
