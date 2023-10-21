
import { defineStore } from "pinia";
import { AccountInfoData } from "@/api/account/type";
import { ref } from "vue";
import { reqMyInfo } from "@/api/account";
import { removeToken } from "@/utils/auth";
import { useWebSocketStore } from "./websocket";
import router from "@/router";

export const useAccountStore = defineStore('account',()=>{
    const myInfo = ref<AccountInfoData | null>(null)
    const loginBox = ref<boolean>(false)
    const showLogin = ()=>{
        loginBox.value = true
    }
    const hideLogin = ()=>{
        loginBox.value = false
    }
    const getMyInfo = async(token:string)=>{
        const result = await reqMyInfo(token)
        myInfo.value = result.data 
        websocketStore.initializeWebSocket()
    }
    const clearMyInfo = ()=>{
        myInfo.value = null
    }
    const websocketStore = useWebSocketStore()
    const logout = ()=>{
        clearMyInfo()
        removeToken()
        websocketStore.closeWebSocket()
        router.push("/")
        showLogin()
    }
    return {
        myInfo,
        loginBox,
        getMyInfo,
        clearMyInfo,
        showLogin,
        hideLogin,
        logout
    }
},{
    persist:true//持久化配置
})