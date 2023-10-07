import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAccountStore } from '@/stores/modules/account'
import { getToken} from './auth'

let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout:5000
})

//配置请求拦截器
request.interceptors.request.use(config=>{
    if(getToken()){
        config.headers['token'] = getToken()
    }
    return config
})

//配置响应拦截器
request.interceptors.response.use((response)=>{
    if(response.status === 200){
        return Promise.resolve(response.data)
    }
    else{
        return Promise.reject(response.data)
    }
},(error)=>{
    const accountStore = useAccountStore()
    //统一错误处理
    let message:string = ''
    switch (error.response.status){
        case 401:
            message = '未登录'
            break
        case 404:
            message = '网络请求不存在'
            break
        case 500:
            message = '服务器出现问题'
            break
        default:
            message = error.response.data.message
            break
    }
    console.log(message)
    ElMessage({
        type:'error',
        message
    })
    if(error.response.status===401){
        accountStore.logout()
    }
    return Promise.reject(error)
})

export default request