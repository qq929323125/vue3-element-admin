/*
 * @Author: your name
 * @Date: 2021-01-07 17:30:30
 * @LastEditTime: 2021-01-11 16:29:36
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
        token: sessionStorage.getItem("token") || ""
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
        }
    },
    actions: {
        toggle_slider({ commit }) {
            commit("TOGGLE_SLIDER");
        },
        set_token({ commit }, token) {
            commit("SET_TOKEN", token);
        }
    }
};
