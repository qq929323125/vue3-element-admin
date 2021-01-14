/*
 * @Author: your name
 * @Date: 2021-01-07 17:46:31
 * @LastEditTime: 2021-01-14 11:45:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\store\getters.js
 */
export default {
    opened: state => state.app.slider.opened,
    token: state => state.app.token,
    menuList: state => state.app.menuList
};
