<!--
 * @Author: xujianhua
 * @Date: 2021-04-01 17:06:04
 * @LastEditTime: 2021-11-30 18:55:11
 * @Description: file content
 * @FilePath: \vue3-element-admin\src\views\layoutpages\leisure\Game.vue
-->
<template>
    <div id="ve_puzzle">
        <div
            class="ve_artwork"
            :style="{
                backgroundImage: show_img || success ? `url(${img})` : 'none',
            }"
        >
            <div
                v-for="i in 16"
                :key="i"
                :class="[
                    've_item_box',
                    `pic${i}`,
                    `img${arr[i - 1]}`,
                    show_img || success ? 've_show_img' : '',
                    success && i == 16 ? 've_finish' : '',
                ]"
                :style="{
                    backgroundImage:
                        i == 16
                            ? success
                                ? `url(${img})`
                                : 'none'
                            : `url(${img})`,
                }"
                :ref="
                    (el) => {
                        if (el) divs[i - 1] = el;
                    }
                "
                @click.self.stop="move_img(i - 1, $event)"
            />
        </div>
        <div class="ve_button">
            <div class="ve_game_button">
                <el-row :gutter="10">
                    <el-col :span="12" :offset="0">
                        <el-button
                            type="primary"
                            @click="get_nums()"
                            style="width: 100%"
                        >
                            重新开始
                        </el-button>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-button
                            style="width: 100%"
                            :type="show_img ? 'success' : 'info'"
                            @click="see_img()"
                            :disabled="success"
                        >
                            {{ txt }}
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="ve_upload">
                <el-upload
                    style="width: 100%"
                    action=""
                    accept="image/png, image/jpeg"
                    ref="upload"
                    :on-change="onChange"
                    :auto-upload="false"
                    :show-file-list="false"
                >
                    <el-button style="width: 100%" type="danger">
                        用我的萌照
                    </el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        description: "拼图小游戏",
    }),
};
</script>

<script setup>
import { ref, onBeforeUpdate } from "vue";
let url = require("../../../assets/logo.png");
const img = ref(url);
const show_img = ref(false);
const txt = ref("查看原图");
const divs = ref([]);
const arr = ref([]);
const success = ref(false); //游戏状态
/**
 * @description:换图片
 * @param {*}
 * @return {*}
 */
const onChange = (file) => {
    img.value = URL.createObjectURL(file.raw);
    get_nums();
    // console.log(URL.createObjectURL(file.raw));
};

/**
 * @description: 查看原图
 * @param {*}
 * @return {*}
 */
const see_img = () => {
    show_img.value = !show_img.value;
    txt.value = show_img.value ? "继续游戏" : "查看原图";
};
/**
 * @description:初始化,生成1-16的16个随机排列的数字
 * @param {*}
 * @return {*}
 */
const get_nums = () => {
    txt.value = "查看原图";
    show_img.value = false;
    success.value = false;
    arr.value.length = 0;
    for (let i = 1; i < 16; i++) {
        arr.value.push(i);
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
        arr.value.sort(() => 0.5 - Math.random());
        if (check_nums(arr.value)) {
            break;
        }
    }
    arr.value.push(16);
};
/**
 * @description: 检查打乱后的数组是否合理
 * @param {*}
 * @return {*}
 */
const check_nums = (arr) => {
    let count = 0;
    for (let i = 0; i < 15; i++) {
        for (let j = i + 1; j < 15; j++) {
            if (arr[j] < arr[i]) {
                count++;
            }
        }
    }
    return count % 2 === 0;
};
/**
 * @description:检查是否拼图成功
 * @param {*}
 * @return {*}
 */
const check_finish = () => {
    let bool = arr.value.every((item, i) => {
        return item == i + 1;
    });
    bool && (success.value = true);
};
/**
 * @description:图片点击事件,移动图片
 * @param {*}
 * @return {*}
 */
const move_img = (i, e) => {
    let top = e.target.offsetTop;
    let left = e.target.offsetLeft;
    let top_16 = divs.value[15].offsetTop;
    let left_16 = divs.value[15].offsetLeft;
    let x = Math.abs(left - left_16);
    let y = Math.abs(top - top_16);
    if ((x == 100 && top == top_16) || (y == 100 && left == left_16)) {
        let a = arr.value[15];
        arr.value[15] = arr.value[i];
        arr.value[i] = a;
        check_finish();
    }
};
get_nums();
// 确保在每次更新之前重置ref
onBeforeUpdate(() => {
    divs.value = [];
});
</script>

<style lang="scss" scoped>
#ve_puzzle {
    margin-top: 10px;
    .ve_artwork {
        margin: 0 auto;
        position: relative;
        width: 399px;
        height: 399px;
        background-size: 399px;
        box-shadow: 1px 1px 10px rgb(168, 168, 168),
            -1px -1px 10px rgb(168, 168, 168);

        .ve_item_box {
            opacity: 1;
            cursor: pointer;
            position: absolute;
            z-index: 2;
            width: 99px;
            height: 99px;
            transition: all 0.2s;
            background-repeat: no-repeat;
            background-size: 399px;
            &.ve_show_img {
                opacity: 0;
            }
        }
        @for $i from 1 through 4 {
            @for $j from ($i - 1) * 4 + 1 through ($i - 1) * 4 + 4 {
                .img#{$j} {
                    top: #{($i - 1) * 100}px;
                }
                .pic#{$j} {
                    background-position-y: -#{($i - 1) * 100}px;
                }
            }
            @for $k from $i through $i + 3 {
                .img#{ ($k - $i) * 4 + $i} {
                    left: #{($i - 1) * 100}px;
                }
                .pic#{ ($k - $i) * 4 + $i} {
                    background-position-x: -#{($i - 1) * 100}px;
                }
            }
        }
        .pic16 {
            transition: none;
            box-shadow: inset 1px 1px 10px rgb(168, 168, 168),
                inset -1px -1px 10px rgb(168, 168, 168);
            z-index: 1;
            &.ve_finish {
                box-shadow: none;
            }
        }
    }
    .ve_button {
        width: 409px;
        margin: 0 auto;
        .ve_game_button {
            margin: 10px 0;
        }
    }
    & :deep(.el-upload--text) {
        width: 100%;
    }
}
</style>
