/*
 * @Author: your name
 * @Date: 2021-03-17 09:30:54
 * @LastEditTime: 2021-04-28 17:44:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\directives\modules\resize.js
 */
const resize = (el, binding) => {
    const { value } = binding;
    // 创建iframe标签，设置样式并插入到被监听元素中
    const iframe = document.createElement("iframe");
    iframe.setAttribute("class", "size-watch");
    el.appendChild(iframe);

    // 记录元素当前宽高
    let oldWidth = el.offsetWidth;
    let oldHeight = el.offsetHeight;

    // iframe 大小变化时的回调函数
    function sizeChange() {
        // 记录元素变化后的宽高
        let width = el.offsetWidth;
        let height = el.offsetHeight;
        // 不一致时触发回调函数 cb，并更新元素当前宽高
        if (width !== oldWidth || height !== oldHeight) {
            value();
            oldWidth = width;
            oldHeight = height;
        }
    }

    // 设置定时器用于节流
    let timer = null;
    // 将 sizeChange 函数挂载到 iframe 的resize回调中
    iframe.contentWindow.onresize = function () {
        clearTimeout(timer);
        timer = null;
        timer = setTimeout(sizeChange, 200);
    };
};
export default resize;
