<!--
 * @Author: your name
 * @Date: 2021-01-18 15:46:34
 * @LastEditTime: 2021-03-17 11:26:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\views\Home.vue
-->
<template>
    <div class="ve_home">
        <el-row>
            <el-col :span="16"><dashboard /></el-col>
            <el-col :span="8"
                ><el-calendar class="ve_calendar"> </el-calendar
            ></el-col>
        </el-row>
        <live-chart />
    </div>
</template>

<script>
import dashboard from "@/components/dashboard/Shortcuts";
import LiveChart from "@/components/dashboard/LiveChart";

export default {
    components: { dashboard, LiveChart },
    setup() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.ve_calendar {
    background: #f56c6c;
    border-radius: 10px;
    &:hover {
        box-shadow: 3px 3px 6px 1px rgba(0, 0, 0, 0.2);
    }

    :deep .el-calendar__body {
        padding-bottom: 12px !important;
        .el-calendar-day {
            height: auto !important;
        }
        .el-calendar-table td {
            border: none;
            text-align: center;
        }
    }
}
</style>
