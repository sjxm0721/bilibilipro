import { createApp } from "vue";
import App from "./App.vue";

import "element-plus/dist/index.css";

//引入pinia仓库以及持久化
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

//引入NPlayer播放器
import NPlayer from "@nplayer/vue";

//引入svg
import "virtual:svg-icons-register";

//引入路由
import router from "./router";

import "@/styles/index.scss";

//注册全局组件
import globalComponent from "../src/components/index.ts";

//引入md文档编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});


//@ts-ignore

const app = createApp(App);
const pinia = createPinia();

//注册pinia持久化插件
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(globalComponent);
app.use(router);
app.use(NPlayer);
app.use(VMdEditor);
app.use(VMdPreview);

app.mount("#app");
