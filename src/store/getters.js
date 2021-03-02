/*
 * @Author: your name
 * @Date: 2021-01-07 17:46:31
 * @LastEditTime: 2021-03-02 14:15:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\store\getters.js
 */
export default {
    opened: state => state.app.slider.opened,
    token: state => state.app.token,
    uname: state => state.app.uname,
    menuList: state => state.app.menuList
};
