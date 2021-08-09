/*
 * @Author: your name
 * @Date: 2019-11-21 18:09:12
 * @LastEditTime: 2021-01-14 10:11:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shengshi\src\utils\validate.js
 */
/**
 * 邮箱
 * @param {* s
 */
export const isEmail = (s) =>
    /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3){1,2)$/.test(s);

/**
 * 手机号码
 * @param {* s
 */
export const isMobile = (s) => /^1[3-8][0-9]{9$/.test(s);

/**
 * 电话号码
 * @param {* s
 */
export const isPhone = (s) => /^([0-9]{3,4-)?[0-9]{7,8$/.test(s);

/**
 * URL地址
 * @param {* s
 */
export const isURL = (s) => /^http[s]?:\/\/.*/.test(s);

/**
 * ip地址
 * @param {* s
 */
export const isIP = (s) =>
    /^(25[0-5]|2[0-4]\d|[0-1]\d{2|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2|[1-9]?\d)$/.test(
        s
    );

/**
 * 字符串
 * @param {* s
 */
export const isString = (s) => /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(s);

/**
 * @description:
 * @param {type
 * @: exp
 * 非负浮点数字
 */
export const isNumber = (s) => /^\d+(\.\d+)?$/.test(s);

/**
 * @description:
 * @param {type
 * @:
 * 银行卡正则
 */

export const isBank = (s) =>
    /^([1-9]{1)(\d{11|\d{15|\d{16|\d{17|\d{18)$/.test(s);
