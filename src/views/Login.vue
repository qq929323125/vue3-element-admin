<!--
 * @Author: your name
 * @Date: 2021-01-11 11:14:26
 * @LastEditTime: 2022-04-28 18:35:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\views\Login.vue
-->
<template>
    <common>
        <div class="ve_container">
            <el-card :body-style="{ background: 'rgba(0,0,0,0.15)' }">
                <h1>vue3-element-admin</h1>
                <transition name="el-fade-in-linear">
                    <el-form
                        :model="form"
                        :rules="rules"
                        v-show="!success"
                        class="ve_form"
                        ref="ref_form"
                        :inline="false"
                        @keyup.enter="onSubmit"
                    >
                        <el-form-item prop="userName">
                            <el-input
                                v-model.trim="userName"
                                placeholder="用户名"
                            >
                                <template #prepend>
                                    <el-icon :size="20"><Avatar /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input
                                v-model.trim="pwd"
                                show-password
                                placeholder="密码"
                            >
                                <template #prepend>
                                    <el-icon :size="20"><Key /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                class="ve_submit"
                                type="primary"
                                @click="onSubmit"
                            >
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </transition>
            </el-card>
        </div>
    </common>
</template>

<script setup>
import { SET_TOKEN, SET_UNAME } from "@/store/modules/app/type";
import Common from "@/components/Common";
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const rules = {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const store = useStore();
const router = useRouter();
const form = reactive({
    userName: "Administrator",
    pwd: "123456",
});
const { userName, pwd } = toRefs(form);
const ref_form = ref(null);
const success = ref(false);
sessionStorage.clear();
store.dispatch(`app/${SET_TOKEN}`, "");
router.options.isAddDynamicMenuRoutes = false;

const onSubmit = () => {
    ref_form.value.validate(async (valid) => {
        if (valid) {
            const data = await VE_API.system.login(form);
            if (data.code === "00") {
                const { token, uname } = data;
                store.dispatch(`app/${SET_TOKEN}`, token);
                store.dispatch(`app/${SET_UNAME}`, uname);
                success.value = true;
                router.push({ name: "AppMain" });
            }
        } else {
            return;
        }
    });
};
</script>

<style lang="scss" scoped>
.ve_container {
    position: absolute;
    z-index: 1;
    width: 400px;
    top: 50%;
    left: 100px;
    transform: translateY(-50%);
    transition: all 1s;
    min-height: 273px;
    text-align: center;
    h1 {
        font-size: 24px;
        transition: all 1s;
        font-weight: bold;
        margin-bottom: 36px;
    }
    .ve_form {
        .ve_submit {
            width: 100%;
        }
        :deep(.el-input-group__prepend) {
            padding: 0 10px;
        }
    }
}
</style>
