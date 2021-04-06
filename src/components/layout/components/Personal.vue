<!--
 * @Author: your name
 * @Date: 2021-01-15 16:42:16
 * @LastEditTime: 2021-03-25 09:44:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\components\Personal.vue
-->
<template>
    <div class="ve_personal">
        <el-button
            title="刷新"
            style="border:none;font-size:20px"
            icon="el-icon-refresh"
            circle
            plain
            @click="reload()"
        ></el-button>
        <el-divider direction="vertical"></el-divider>
        <el-dropdown @command="handleCommand">
            <span class="ve_nav_dropdown">
                你好!{{ uname
                }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :command="{ name: 'Login' }"
                        >退出登录</el-dropdown-item
                    >
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- <router-link :to="{ name: 'Login' }">
            <el-link :underline="false">退出</el-link>
        </router-link> -->
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { inject, computed } from "vue";
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const uname = computed(() => store.getters.uname);
        const reload = inject("reload");
        const handleCommand = command => {
            router.push(command);
        };
        return { reload, uname, handleCommand };
    }
};
</script>

<style lang="scss" scoped>
.ve_personal {
    flex: 1;
    text-align: right;
    .ve_nav_dropdown {
        font-weight: bold;
    }
}
</style>
