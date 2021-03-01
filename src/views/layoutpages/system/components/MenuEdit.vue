<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-03-01 16:00:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\layoutpages\system\components\usersEdit.vue
-->
<template>
    <el-dialog
        :title="title"
        append-to-body
        destroy-on-close
        :model-value="showDialog"
        @close="closeDialog()"
    >
        <!-- <span>{{ rowData }}</span> -->
        <!-- 表单内容 -->
        <el-form :model="form" label-width="80px" :inline="false">
            <el-form-item label="名称">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-radio-group v-model="type" @change="url = ''">
                    <el-radio-button :label="0">目录</el-radio-button>
                    <el-radio-button :label="1">菜单</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图标">
                <el-select
                    style="width:100%"
                    v-model="icon"
                    placeholder=""
                    clearable
                    filterable
                    popper-class="ve_option_box"
                >
                    <template v-slot:prefix>
                        <i :class="icon" style="color:#000"></i>
                    </template>
                    <el-option
                        style="display:inline-block; height:auto;padding:10px 11px 0px"
                        v-for="item in icons"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                        <i style="font-size:30px" :class="item"></i>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="父级">
                <el-cascader
                    style="width:100%"
                    :options="menuList"
                    v-model="pId"
                    clearable
                    filterable
                    :props="{
                        checkStrictly: true,
                        value: 'id',
                        label: 'name',
                        disabled: 'url'
                    }"
                >
                </el-cascader>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number
                    v-model="sort"
                    :min="0"
                    step-strictly
                    :step="1"
                >
                </el-input-number>
            </el-form-item>
            <el-form-item label="iframe" v-show="type == 1" @change="url = ''">
                <el-radio-group v-model="iframe">
                    <el-radio-button :label="0">否</el-radio-button>
                    <el-radio-button :label="1">是</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="路径" v-show="type == 1">
                <el-input
                    v-if="iframe == 1"
                    v-model="url"
                    placeholder="请输入"
                    clearable
                ></el-input>
                <el-select
                    v-else
                    style="width:100%"
                    v-model="url"
                    placeholder=""
                    clearable
                >
                    <el-option
                        style="height:auto"
                        v-for="item in files"
                        :key="item.url"
                        :label="item.url"
                        :value="item.url"
                    >
                        <p style="margin : 0">{{ item.url }}</p>
                        <span class="ve_select_option_slot"
                            >描述 ：{{ item.description }}</span
                        >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <template v-slot:footer>
            <span>
                <el-button @click="closeDialog()">取消</el-button>
                <el-button type="primary" @click="closeDialog()"
                    >确定</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script>
/**
 * @description:图标集合
 * @param {*}
 * @return {*}
 */
const icons = "el-icon-platform-eleme/el-icon-eleme/el-icon-delete-solid/el-icon-delete/el-icon-s-tools/el-icon-setting/el-icon-user-solid/el-icon-user/el-icon-phone/el-icon-phone-outline/el-icon-more/el-icon-more-outline/el-icon-star-on/el-icon-star-off/el-icon-s-goods/el-icon-goods/el-icon-warning/el-icon-warning-outline/el-icon-question/el-icon-info/el-icon-remove/el-icon-circle-plus/el-icon-success/el-icon-error/el-icon-zoom-in/el-icon-zoom-out/el-icon-remove-outline/el-icon-circle-plus-outline/el-icon-circle-check/el-icon-circle-close/el-icon-s-help/el-icon-help/el-icon-minus/el-icon-plus/el-icon-check/el-icon-close/el-icon-picture/el-icon-picture-outline/el-icon-picture-outline-round/el-icon-upload/el-icon-upload2/el-icon-download/el-icon-camera-solid/el-icon-camera/el-icon-video-camera-solid/el-icon-video-camera/el-icon-message-solid/el-icon-bell/el-icon-s-cooperation/el-icon-s-order/el-icon-s-platform/el-icon-s-fold/el-icon-s-unfold/el-icon-s-operation/el-icon-s-promotion/el-icon-s-home/el-icon-s-release/el-icon-s-ticket/el-icon-s-management/el-icon-s-open/el-icon-s-shop/el-icon-s-marketing/el-icon-s-flag/el-icon-s-comment/el-icon-s-finance/el-icon-s-claim/el-icon-s-custom/el-icon-s-opportunity/el-icon-s-data/el-icon-s-check/el-icon-s-grid/el-icon-menu/el-icon-share/el-icon-d-caret/el-icon-caret-left/el-icon-caret-right/el-icon-caret-bottom/el-icon-caret-top/el-icon-bottom-left/el-icon-bottom-right/el-icon-back/el-icon-right/el-icon-bottom/el-icon-top/el-icon-top-left/el-icon-top-right/el-icon-arrow-left/el-icon-arrow-right/el-icon-arrow-down/el-icon-arrow-up/el-icon-d-arrow-left/el-icon-d-arrow-right/el-icon-video-pause/el-icon-video-play/el-icon-refresh/el-icon-refresh-right/el-icon-refresh-left/el-icon-finished/el-icon-sort/el-icon-sort-up/el-icon-sort-down/el-icon-rank/el-icon-loading/el-icon-view/el-icon-c-scale-to-original/el-icon-date/el-icon-edit/el-icon-edit-outline/el-icon-folder/el-icon-folder-opened/el-icon-folder-add/el-icon-folder-remove/el-icon-folder-delete/el-icon-folder-checked/el-icon-tickets/el-icon-document-remove/el-icon-document-delete/el-icon-document-copy/el-icon-document-checked/el-icon-document/el-icon-document-add/el-icon-printer/el-icon-paperclip/el-icon-takeaway-box/el-icon-search/el-icon-monitor/el-icon-attract/el-icon-mobile/el-icon-scissors/el-icon-umbrella/el-icon-headset/el-icon-brush/el-icon-mouse/el-icon-coordinate/el-icon-magic-stick/el-icon-reading/el-icon-data-line/el-icon-data-board/el-icon-pie-chart/el-icon-data-analysis/el-icon-collection-tag/el-icon-film/el-icon-suitcase/el-icon-suitcase-1/el-icon-receiving/el-icon-collection/el-icon-files/el-icon-notebook-1/el-icon-notebook-2/el-icon-toilet-paper/el-icon-office-building/el-icon-school/el-icon-table-lamp/el-icon-house/el-icon-no-smoking/el-icon-smoking/el-icon-shopping-cart-full/el-icon-shopping-cart-1/el-icon-shopping-cart-2/el-icon-shopping-bag-1/el-icon-shopping-bag-2/el-icon-sold-out/el-icon-sell/el-icon-present/el-icon-box/el-icon-bank-card/el-icon-money/el-icon-coin/el-icon-wallet/el-icon-discount/el-icon-price-tag/el-icon-news/el-icon-guide/el-icon-male/el-icon-female/el-icon-thumb/el-icon-cpu/el-icon-link/el-icon-connection/el-icon-open/el-icon-turn-off/el-icon-set-up/el-icon-chat-round/el-icon-chat-line-round/el-icon-chat-square/el-icon-chat-dot-round/el-icon-chat-dot-square/el-icon-chat-line-square/el-icon-message/el-icon-postcard/el-icon-position/el-icon-turn-off-microphone/el-icon-microphone/el-icon-close-notification/el-icon-bangzhu/el-icon-time/el-icon-odometer/el-icon-crop/el-icon-aim/el-icon-switch-button/el-icon-full-screen/el-icon-copy-document/el-icon-mic/el-icon-stopwatch/el-icon-medal-1/el-icon-medal/el-icon-trophy/el-icon-trophy-1/el-icon-first-aid-kit/el-icon-discover/el-icon-place/el-icon-location/el-icon-location-outline/el-icon-location-information/el-icon-add-location/el-icon-delete-location/el-icon-map-location/el-icon-alarm-clock/el-icon-timer/el-icon-watch-1/el-icon-watch/el-icon-lock/el-icon-unlock/el-icon-key/el-icon-service/el-icon-mobile-phone/el-icon-bicycle/el-icon-truck/el-icon-ship/el-icon-basketball/el-icon-football/el-icon-soccer/el-icon-baseball/el-icon-wind-power/el-icon-light-rain/el-icon-lightning/el-icon-heavy-rain/el-icon-sunrise/el-icon-sunrise-1/el-icon-sunset/el-icon-sunny/el-icon-cloudy/el-icon-partly-cloudy/el-icon-cloudy-and-sunny/el-icon-moon/el-icon-moon-night/el-icon-dish/el-icon-dish-1/el-icon-food/el-icon-chicken/el-icon-fork-spoon/el-icon-knife-fork/el-icon-burger/el-icon-tableware/el-icon-sugar/el-icon-dessert/el-icon-ice-cream/el-icon-hot-water/el-icon-water-cup/el-icon-coffee-cup/el-icon-cold-drink/el-icon-goblet/el-icon-goblet-full/el-icon-goblet-square/el-icon-goblet-square-full/el-icon-refrigerator/el-icon-grape/el-icon-watermelon/el-icon-cherry/el-icon-apple/el-icon-pear/el-icon-orange/el-icon-coffee/el-icon-ice-tea/el-icon-ice-drink/el-icon-milk-tea/el-icon-potato-strips/el-icon-lollipop/el-icon-ice-cream-square/el-icon-ice-cream-round".split(
    "/"
);
/**
 * @description: 获取文件路径
 * @param {*}
 * @return {*}
 */
const getfiles = () => {
    const files = require.context("@/views/layoutpages", true, /\.vue$/);
    return files
        .keys()
        .map(key => {
            return {
                url: key.replace(/^(\.\/)|(\.vue)/g, ""),
                description: files(key).default.description || "无"
            };
        })
        .filter(key => {
            return !key.url.includes("/components/");
        });
};

import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
    props: {
        showDialog: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: "添加"
        },
        rowData: {
            type: Object,
            default: null
        }
    },
    emits: ["closeDialog"],
    setup(props, { emit }) {
        const store = useStore();
        const menuList = computed(() => store.getters.menuList);
        const closeDialog = () => {
            console.log("检测", form);
            emit("closeDialog", false);
        };

        const form = reactive({
            name: "",
            type: 1,
            pId: [],
            url: "",
            icon: "el-icon-menu",
            iframe: 0,
            sort: 0
        });
        const { name, type, pId, url, icon, iframe, sort } = toRefs(form);

        return {
            icons,
            files: getfiles(),
            closeDialog,
            menuList,
            form,
            ...{ name, type, pId, url, icon, iframe, sort }
        };
    }
};
</script>

<style lang="scss" scoped></style>
