import { createApp } from 'vue'
import App from './App.vue'


//引入pinia仓库以及持久化
import { createPinia } from 'pinia';
import  piniaPluginPersistedstate  from 'pinia-plugin-persistedstate';

//引入NPlayer播放器
import NPlayer from "@nplayer/vue";

//引入svg
import 'virtual:svg-icons-register'

//引入路由
import router from './router'

import '@/styles/index.scss'

//注册全局组件
import globalComponent from '../src/components/index.ts'

//@ts-ignore

const app = createApp(App)
const pinia = createPinia()

//注册pinia持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(globalComponent)
app.use(router)
app.use(NPlayer)

app.mount('#app')
