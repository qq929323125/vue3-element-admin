/*
 * @Author: your name
 * @Date: 2021-03-17 09:30:54
 * @LastEditTime: 2021-12-22 15:26:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\directives\modules\resize.js
 */
import { useElementSize } from "@vueuse/core";
import { debouncedWatch } from "@vueuse/core";
const resize = (el, binding) => {
    const { width } = useElementSize(el);
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
