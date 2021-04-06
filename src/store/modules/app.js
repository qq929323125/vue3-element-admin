/*
 * @Author: your name
 * @Date: 2021-01-07 17:30:30
 * @LastEditTime: 2021-03-18 17:36:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\store\modules\app1.js
 */
export default {
    namespaced: true,
    state: {
        slider: {
            opened: JSON.parse(sessionStorage.getItem("opened"))
        },
        token: sessionStorage.getItem("token") || "",
        menuList: null,
        permissionList: [],
        uname: sessionStorage.getItem("uname") || ""
    },
    mutations: {
        TOGGLE_SLIDER(state) {
            state.slider.opened = !state.slider.opened;
            sessionStorage.setItem(
                "opened",
                JSON.stringify(state.slider.opened)
            );
        },
        SET_TOKEN(state, token) {
            state.token = token;
            sessionStorage.setItem("token", state.token);
        },
        SET_UNAME(state, uname) {
            state.uname = uname;
            sessionStorage.setItem("uname", state.uname);
        },
        SET_MENU_LIST(state, menuList) {
            state.menuList = menuList;
        },
        SET_PERMISSION_LIST(state, permissionList) {
            state.permissionList = permissionList;
        }
    },
    actions: {
        toggle_slider({ commit }) {
            commit("TOGGLE_SLIDER");
        },
        set_token({ commit }, token) {
            commit("SET_TOKEN", token);
        },
        set_uname({ commit }, uname) {
            commit("SET_UNAME", uname);
        },
        set_menu_list({ commit }, menuList) {
            commit("SET_MENU_LIST", menuList);
        },
        set_permission_List({ commit }, menuList) {
            let allMenus = XE.filterTree(menuList, item => item.type == 1);
            let permissionList = [];
            allMenus.forEach(item => {
                if (item.children && item.children.length > 0) {
                    item.children.forEach(menu => {
                        permissionList.push(
                            `${item.url}/${item.id}/${menu.menu}`
                        );
                    });
                }
            });
            commit("SET_PERMISSION_LIST", permissionList);
        }
    }
};
