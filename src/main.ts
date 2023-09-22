import { createApp } from 'vue'
import App from './App.vue'





//引入svg
import 'virtual:svg-icons-register'

//引入路由
import router from './router'

import '@/styles/index.scss'

//注册全局组件
import globalComponent from '@/components/index'

//@ts-ignore

const app = createApp(App)




app.use(globalComponent)
app.use(router)

app.mount('#app')
