<!--
 * @Author: your name
 * @Date: 2021-01-11 11:14:26
 * @LastEditTime: 2021-01-11 16:37:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\Login.vue
-->
<template>
    <div :class="[{ 've_form-success': success }, 've_wrapper']">
        <div class="ve_container">
            <h1>VE-Admin</h1>
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
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <el-input
                            v-model.trim="pwd"
                            placeholder="密码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="ve_submit"
                            type="primary"
                            @click="onSubmit"
                            >登录</el-button
                        >
                    </el-form-item>
                </el-form>
            </transition>
        </div>

        <ul class="ve_bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const rules = {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
};
export default {
    name: "Login",
    setup() {
        sessionStorage.clear();
        const success = ref(false);
        const form = reactive({
            userName: "",
            pwd: ""
        });
        const { userName, pwd } = toRefs(form);
        const ref_form = ref(null);
        const store = useStore();
        const router = useRouter();

        const onSubmit = () => {
            ref_form.value.validate(async valid => {
                if (valid) {
                    const data = await VE_API.user.login(form);
                    if (data.code === "00") {
                        const { token } = data;
                        store.dispatch("app/set_token", token);
                        success.value = true;
                        router.push({ name: "AppMain" });
                    }
                } else {
                    return;
                }
            });
        };
        return {
            success,
            form,
            ref_form,
            userName,
            pwd,
            rules,
            onSubmit
        };
    }
};
</script>

<style lang="scss" scoped>
.ve_wrapper {
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    &.ve_form-success .ve_container h1 {
        -webkit-transform: translateY(85px);
        -ms-transform: translateY(85px);
        transform: translateY(85px);
    }
    .ve_container {
        width: 300px;
        min-height: 273px;
        text-align: center;
        h1 {
            color: #fff;
            font-size: 40px;
            -webkit-transition-duration: 1s;
            transition-duration: 1s;
            -webkit-transition-timing-function: ease-in-put;
            transition-timing-function: ease-in-put;
            font-weight: 400;
        }
        .ve_form {
            .ve_submit {
                width: 100%;
            }
        }
    }
    .ve_bg-bubbles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        padding: 0;
        margin: 0;
        li {
            position: absolute;
            list-style: none;
            display: block;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.15);
            bottom: -160px;
            -webkit-animation: square 25s infinite;
            animation: square 25s infinite;
            -webkit-transition-timing-function: linear;
            transition-timing-function: linear;
            &:nth-child(1) {
                left: 10%;
            }
            &:nth-child(2) {
                left: 20%;
                width: 80px;
                height: 80px;
                -webkit-animation-delay: 2s;
                animation-delay: 2s;
                -webkit-animation-duration: 17s;
                animation-duration: 17s;
            }
            &:nth-child(3) {
                left: 25%;
                -webkit-animation-delay: 4s;
                animation-delay: 4s;
            }
            &:nth-child(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                -webkit-animation-duration: 22s;
                animation-duration: 22s;
                background-color: rgba(255, 255, 255, 0.25);
            }
            &:nth-child(5) {
                left: 70%;
            }
            &:nth-child(6) {
                left: 80%;
                width: 120px;
                height: 120px;
                -webkit-animation-delay: 3s;
                animation-delay: 3s;
                background-color: rgba(255, 255, 255, 0.2);
            }
            &:nth-child(7) {
                left: 32%;
                width: 160px;
                height: 160px;
                -webkit-animation-delay: 7s;
                animation-delay: 7s;
            }
            &:nth-child(8) {
                left: 55%;
                width: 20px;
                height: 20px;
                -webkit-animation-delay: 15s;
                animation-delay: 15s;
                -webkit-animation-duration: 40s;
                animation-duration: 40s;
            }
            &:nth-child(9) {
                left: 25%;
                width: 10px;
                height: 10px;
                -webkit-animation-delay: 2s;
                animation-delay: 2s;
                -webkit-animation-duration: 40s;
                animation-duration: 40s;
                background-color: rgba(255, 255, 255, 0.3);
            }
            &:nth-child(10) {
                left: 90%;
                width: 160px;
                height: 160px;
                -webkit-animation-delay: 11s;
                animation-delay: 11s;
            }
        }
    }
}
@-webkit-keyframes square {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-700px) rotate(600deg);
        transform: translateY(-700px) rotate(600deg);
    }
}
@keyframes square {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-700px) rotate(600deg);
        transform: translateY(-700px) rotate(600deg);
    }
}
</style>
