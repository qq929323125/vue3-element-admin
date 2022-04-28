/*
 * @Author: your name
 * @Date: 2020-10-14 13:50:09
 * @LastEditTime: 2022-01-27 15:30:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Ed
 * @FilePath: \vue3-element-admin\src\main.js
 */
import { createApp } from "vue";
import axios from "@/plugins/axios";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import installElementPlus from "@/plugins/element";
import elementIcon from "@/plugins/svgicon";
import permission from "@/plugins/permission";
import mock from "@/plugins/mock";
import directives from "@/directives";
import veBaseComponents from "@/components/veBaseComponents";

import "normalize.css/normalize.css";
import "nprogress/nprogress.css";
import "@/styles/common.scss";
const app = createApp(App);
app.use(mock)
    .use(elementIcon)
    .use(veBaseComponents)
    .use(store)
    .use(router)
    .use(installElementPlus)
    .use(axios, { router, store, opt: "VE_API" })
    .use(permission, { router, store })
    .use(directives, { router, store })
    .mount("#app");
