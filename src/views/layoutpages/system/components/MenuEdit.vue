<!--
 * @Author: your name
 * @Date: 2021-02-09 15:24:23
 * @LastEditTime: 2021-03-15 11:52:47
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
                    <el-radio-button :disabled="typeItemDisabled(0)" :label="0"
                        >目录</el-radio-button
                    >
                    <el-radio-button :disabled="typeItemDisabled(1)" :label="1"
                        >菜单</el-radio-button
                    >
                    <el-radio-button :disabled="typeItemDisabled(2)" :label="2"
                        >按钮</el-radio-button
                    >
                </el-radio-group>
            </el-form-item>
            <el-form-item label="父级" prop="pId">
                <el-cascader
                    style="width:100%"
                    :options="menuList"
                    v-model="pId"
                    clearable
                    filterable
                    :props="cascaderProp"
                    @change="cascaderChange"
                    :disabled="title != '添加'"
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

            <el-form-item
                label="iframe"
                v-show="type == 1"
                @change="changeIframe()"
            >
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
                <template v-if="menuOptions">
                    <el-radio-group v-model="menu" @change="changeMenu()">
                        <el-radio
                            v-for="(item, key) in menuOptions"
                            :key="key"
                            :label="key"
                            :disabled="menuDisabled(key)"
                            >{{ item }}</el-radio
                        >
                    </el-radio-group>
                </template>
                <span style="color:red" v-else>该菜单下没有按钮</span>
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
                description:
                    files(key).default.data &&
                    (files(key).default.data().description || "无"),
                menus:
                    files(key).default.data &&
                    (files(key).default.data().menus || [])
            };
        })
        .filter(key => {
            return !key.url.includes("/components/");
        });
};

import { icons, treeFindPath } from "@/utils";
import { reactive, ref, toRefs, computed, nextTick, onMounted } from "vue";
// import { useStore } from "vuex";

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
        },
        menuList: {
            type: Array,
            default: null
        }
    },
    emits: ["closeDialog"],
    setup(props, { emit }) {
        const { title, rowData, menuList } = toRefs(props);
        const closeDialog = () => {
            emit("closeDialog", false);
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            type: 0,
            pId: "",
            menu: "",
            url: "",
            icon: "el-icon-menu",
            iframe: 1,
            sort: 1
        });
        const { name, type, pId, menu, url, icon, iframe, sort } = toRefs(form);
        /**
         * @description: 字段重置
         * @param {*}
         * @return {*}
         */
        const resetForm = () => {
            name.value = "";
            menu.value = "";
            url.value = "";
            icon.value = "el-icon-menu";
            iframe.value = 1;
            sort.value = 1;
        };

        /**
         * @description: 级联选择器props
         * @param {*} computed
         * @return {*}
         */
        const cascaderProp = computed(() => ({
            emitPath: false,
            checkStrictly: true,
            value: "id",
            label: "name",
            disabled: type.value == 2 ? "iframe" : "type"
        }));
        /**表单验证规则
         * @description:
         * @param {*} computed
         * @return {*}
         */
        const rules = computed(() => ({
            pId: [
                {
                    required: type.value == 2 ? true : false,
                    message: "请选择父级菜单",
                    trigger: "change"
                }
            ],
            name: [
                {
                    required: type.value != 2 ? true : false,
                    message: "请输入菜单名称",
                    trigger: "blur"
                }
            ],
            menu: [
                {
                    required: type.value == 2 ? true : false,
                    message: "请选择按钮",
                    trigger: "change"
                }
            ],
            icon: [
                {
                    required: type.value != 2 ? true : false,
                    message: "请选择图标",
                    trigger: "change"
                }
            ],
            url: [
                {
                    required: type.value == 1 ? true : false,
                    pattern: /^(https?:\/\/)?(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
                    message: "url不正确",
                    trigger: "change"
                }
            ]
        }));

        /**
         * @description:初始化赋值
         * @param {*}
         * @return {*}
         */
        rowData.value &&
            ((name.value = rowData.value.name),
            (type.value = rowData.value.type),
            (pId.value = rowData.value.parentId),
            (url.value = rowData.value.url),
            (menu.value = rowData.value.menu),
            (icon.value = rowData.value.icon),
            (iframe.value = rowData.value.iframe),
            (sort.value = rowData.value.sort));
        /**
         * @description: 类型切换事件
         * @param {*}
         * @return {*}
         */
        const changeType = () => {
            formRef.value.resetFields();
        };
        /**
         * @description: 父级id切换事件
         * @param {*}
         * @return {*}
         */
        const cascaderChange = () => {
            if (type.value == 2) {
                name.value = "";
                menu.value = "";
                nextTick(() => {
                    formRef.value.clearValidate("menu");
                });
            }
        };
        /**
         * @description:iframe切换事件
         * @param {*}
         * @return {*}
         */
        const changeIframe = () => {
            url.value = "";
            nextTick(() => {
                if (rowData.value && iframe.value == rowData.value.iframe) {
                    url.value = rowData.value.url;
                }
                formRef.value.clearValidate("url");
            });
        };
        /**
         * @description:切换菜单按钮触发事件
         * @param {*}
         * @return {*}
         */
        const changeMenu = () => {
            name.value = menuOptions.value[menu.value];
        };
        /**
         * @description: 按钮的禁用函数
         * @param {*}
         * @return {*}
         */
        const typeItemDisabled = computed(() => label => {
            let flag = true;
            switch (title.value) {
                case "编辑":
                    if (label == type.value) {
                        flag = false;
                    }
                    break;
                case "添加子级":
                    if (label == 0 || label == 1) {
                        flag = false;
                    }
                    break;
                case "添加按钮":
                    if (label == 2) {
                        flag = false;
                    }
                    break;

                default:
                    flag = false;
                    break;
            }
            return flag;
        });

        /**
         * @description:获取menus列表
         * @param {*}
         * @return {*}
         */
        const menuOptions = computed(() => {
            // if (title.value == "添加" || title.value == "添加按钮") {
            let _item = XE.findTree(
                menuList.value,
                item => item.id == pId.value
            );
            if (_item && getfiles().find(item => item.url == _item.item.url)) {
                return getfiles().find(item => item.url == _item.item.url)
                    .menus;
            } else {
                return false;
            }
            // }
        });
        /**
         * @description: 已添加的按钮设为禁用
         * @param {*}
         * @return {*}
         */
        const menuDisabled = computed(() => key => {
            let _item = XE.findTree(
                menuList.value,
                item => item.id == pId.value
            );
            if (_item) {
                if (rowData.value && key == rowData.value.menu) {
                    return false;
                }
                return (
                    _item.item.children.find(item => item.menu == key) && true
                );
            }
        });
        /**
         * @description: 监听title
         * @param {*}
         * @return {*}
         */
        const watchTitle = () => {
            if (title.value == "添加按钮" || title.value == "添加子级") {
                resetForm();
                pId.value = treeFindPath(
                    menuList.value,
                    data => data.id === rowData.value.id
                ).slice(-1)[0];
                title.value == "添加按钮" && (type.value = 2);
            }
        };
        onMounted(() => {
            watchTitle();
        });
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
            changeIframe,
            typeItemDisabled,
            // menuList,
            formRef,
            rules,
            form,
            ...{ name, type, pId, menu, url, icon, iframe, sort },
            cascaderProp,
            menuOptions,
            menuDisabled,
            cascaderChange,
            changeMenu
        };
    }
};
</script>

<style lang="scss" scoped></style>
