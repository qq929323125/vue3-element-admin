/*
 * @Author: your name
 * @Date: 2021-12-02 16:55:35
 * @LastEditTime: 2021-12-02 16:58:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-element-admin\src\store\modules\app\index.js
 */
import {
    TOGGLE_SLIDER,
    SET_TOKEN,
    SET_UNAME,
    SET_MENU_LIST,
    SET_PERMISSION_LIST,
} from "./type.js";
export default {
    namespaced: true,
    state: {
        slider: {
            opened: JSON.parse(sessionStorage.getItem("opened")),
        },
        token: sessionStorage.getItem("token") || "",
        menuList: null,
        permissionList: [],
        uname: sessionStorage.getItem("uname") || "",
    },
    mutations: {
        [TOGGLE_SLIDER](state) {
            state.slider.opened = !state.slider.opened;
            sessionStorage.setItem(
                "opened",
                JSON.stringify(state.slider.opened)
            );
        },
        [SET_TOKEN](state, token) {
            state.token = token;
            sessionStorage.setItem("token", state.token);
        },
        [SET_UNAME](state, uname) {
            state.uname = uname;
            sessionStorage.setItem("uname", state.uname);
        },
        [SET_MENU_LIST](state, menuList) {
            state.menuList = menuList;
        },
        [SET_PERMISSION_LIST](state, permissionList) {
            state.permissionList = permissionList;
        },
    },
    actions: {
        [TOGGLE_SLIDER]({ commit }) {
            commit(TOGGLE_SLIDER);
        },
        [SET_TOKEN]({ commit }, token) {
            commit(SET_TOKEN, token);
        },
        [SET_UNAME]({ commit }, uname) {
            commit(SET_UNAME, uname);
        },
        [SET_MENU_LIST]({ commit }, menuList) {
            commit(SET_MENU_LIST, menuList);
        },
        [SET_PERMISSION_LIST]({ commit }, menuList) {
            let allMenus = XE.filterTree(menuList, (item) => item.type == 1);
            let permissionList = [];
            allMenus.forEach((item) => {
                if (item.children && item.children.length > 0) {
                    item.children.forEach((menu) => {
                        permissionList.push(
                            `${item.url}/${item.id}/${menu.menu}`
                        );
                    });
                }
            });
            commit(SET_PERMISSION_LIST, permissionList);
        },
    },
};
