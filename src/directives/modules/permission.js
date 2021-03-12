/*
 * @Author: your name
 * @Date: 2021-03-12 14:10:03
 * @LastEditTime: 2021-03-12 16:15:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\directives\modules\permission.js
 */
// import { useStore } from "vuex";
// import { useRoute } from "vue-router";

const permission = (el, binding, router, store) => {
    const { value } = binding;
    function checkArray(permission) {
        let path = location.hash.slice(
            location.hash.indexOf("/") + 1,
            location.hash.indexOf("?")
        );
        permission.forEach(element => {
            return `${path
                .split("-")
                .slice(0, -1)
                .join("/")}/${element}`;
        });
        let arr = store.getters.permissionList;
        return permission.some(key => arr.includes(key));
    }

    if (value) {
        let permission = value.split("|"); // 获取到 v-permission的值
        if (permission && permission.length > 0) {
            let hasPermission = checkArray(permission);
            if (!hasPermission) {
                // 没有权限 移除Dom元素
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
};

export default permission;
