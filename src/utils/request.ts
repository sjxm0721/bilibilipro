import axios from 'axios'

let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout:5000
})

//配置请求拦截器
request.interceptors.request.use(config=>{
    return config
})

//配置响应拦截器
request.interceptors.response.use((response)=>{
    return response
},(error)=>{
    return Promise.reject(error)
})

export default request