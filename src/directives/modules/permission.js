/*
 * @Author: your name
 * @Date: 2021-03-12 14:10:03
 * @LastEditTime: 2021-03-23 18:04:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\directives\modules\permission.js
 */
// import { useStore } from "vuex";
// import { useRoute } from "vue-router";

const permission = (el, binding, app, router, store) => {
    const { value } = binding;
    function checkArray(permission) {
        let path = app.config.globalProperties.$route.name;

        let _permission = permission.map(element => {
            let url = path.replace(/-/g, "/") + "/" + element;
            return url;
        });
        let arr = store.getters.permissionList;
        return _permission.some(key => arr.includes(key));
    }

    if (value && value.length > 0) {
        let hasPermission = checkArray(value);
        if (!hasPermission) {
            // 没有权限 移除Dom元素
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
};

export default permission;
