<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-03-10 09:57:06
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
        <el-form
            ref="formRef"
            :model="form"
            label-width="80px"
            :rules="rules"
            :inline="false"
        >
            <el-form-item label="类型">
                <el-radio-group v-model="type" @change="changeType">
                    <el-radio-button :label="0">目录</el-radio-button>
                    <el-radio-button :label="1">菜单</el-radio-button>
                    <!-- <el-radio-button :label="2">按钮</el-radio-button> -->
                </el-radio-group>
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
                        disabled: 'iframe'
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
            <el-form-item label="名称" prop="name" v-show="type != 2">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon" v-show="type != 2">
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

            <el-form-item label="iframe" v-show="type == 1" @change="url = ''">
                <el-radio-group v-model="iframe">
                    <el-radio-button :label="0">否</el-radio-button>
                    <el-radio-button :label="1">是</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="路径" prop="url" v-show="type == 1">
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
            <el-form-item label="按钮" prop="menu" v-show="type == 2">
                <el-radio-group v-model="menu">
                    <el-radio label="search" border>查询</el-radio>
                    <el-radio label="edit" border>编辑</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <template v-slot:footer>
            <span>
                <el-button @click="closeDialog()">取消</el-button>
                <el-button type="primary" @click="onSubmit()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
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

import { icons, treeFindPath } from "@/utils";
import { reactive, ref, toRefs, computed, nextTick, onMounted } from "vue";
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
        const { rowData } = toRefs(props);
        const store = useStore();
        const menuList = computed(() => store.getters.menuList);
        const closeDialog = () => {
            emit("closeDialog", false);
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            type: 0,
            pId: [],
            menu: "",
            url: "",
            icon: "el-icon-menu",
            iframe: 1,
            sort: 1
        });
        const { name, type, pId, menu, url, icon, iframe, sort } = toRefs(form);
        const rules = reactive({
            name: [
                {
                    required: true,
                    message: "请输入菜单名称",
                    trigger: "blur"
                }
            ],
            icon: [
                {
                    required: true,
                    message: "请选择图标",
                    trigger: "change"
                }
            ],
            url: [
                {
                    required: false,
                    pattern: /^(https?:\/\/)?(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
                    message: "url不正确",
                    trigger: "change"
                }
            ]
        });
        /**
         * @description:初始化赋值
         * @param {*}
         * @return {*}
         */
        rowData.value &&
            ((name.value = rowData.value.name),
            (type.value = rowData.value.type),
            (pId.value = treeFindPath(
                menuList.value,
                data => data.id === rowData.value.id
            ).slice(0, -1)),
            (url.value = rowData.value.url),
            (icon.value = rowData.value.icon),
            (iframe.value = rowData.value.iframe),
            (sort.value = rowData.value.sort));
        /**
         * @description: 类型切换事件
         * @param {*}
         * @return {*}
         */
        onMounted(() => {
            nextTick(() => {
                rules.url[0].required = type.value == 1 ? true : false;
                formRef.value.clearValidate("url");
            });
        });
        const changeType = () => {
            url.value = "";
            rules.url[0].required = type.value == 1 ? true : false;
            nextTick(() => {
                formRef.value.clearValidate("url");
            });
        };

        /**
         * @description:提交表单
         * @param {*}
         * @return {*}
         */
        const onSubmit = () => {
            formRef.value.validate(valid => {
                if (valid) {
                    console.log(form);
                    closeDialog();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        };
        return {
            icons,
            files: getfiles(),
            closeDialog,
            onSubmit,
            changeType,
            menuList,
            formRef,
            rules,
            form,
            ...{ name, type, pId, menu, url, icon, iframe, sort }
        };
    }
};
</script>

<style lang="scss" scoped></style>
