/*
 * @Author: your name
 * @Date: 2021-01-07 17:30:30
 * @LastEditTime: 2021-01-08 09:56:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\store\modules\app1.js
 */
export default {
    namespaced: true,
    state: {
        slider: {
            opened: true
        }
    },
    mutations: {
        TOGGLE_SLIDER(state) {
            state.slider.opened = !state.slider.opened;
        }
    },
    actions: {
        toggle_slider({ commit }) {
            commit("TOGGLE_SLIDER");
        }
    }
};
