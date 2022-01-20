/*
 * @Author: your name
 * @Date: 2021-03-17 09:30:54
 * @LastEditTime: 2022-01-20 14:24:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\directives\modules\resize.js
 */
import { useElementSize, debouncedWatch } from "@vueuse/core";
const resize = (el, binding) => {
    const { width } = useElementSize(el);
    if (width.value === 0) return;
    const { value } = binding;
    debouncedWatch(
        width,
        () => {
            value && value.resize();
        },
        { debounce: 500 }
    );
};
export default resize;
