/*
 * @Author: your name
 * @Date: 2021-01-07 17:30:30
 * @LastEditTime: 2021-03-02 14:10:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\store\modules\app1.js
 */
export default {
    namespaced: true,
    state: {
        slider: {
            opened: JSON.parse(sessionStorage.getItem("opened"))
        },
        token: sessionStorage.getItem("token") || "",
        menuList: null,
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
        }
    }
};
