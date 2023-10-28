
import { defineStore } from "pinia";
import { AccountInfoData } from "@/api/account/type";
import { ref } from "vue";
import { reqMyInfo } from "@/api/account";
import { removeToken } from "@/utils/auth";
import { useWebSocketStore } from "./websocket";
import router from "@/router";
import type { FavPage } from "@/api/fav/type";
import { useFavStore } from "./fav";

export const useAccountStore = defineStore('account',()=>{
    const myInfo = ref<AccountInfoData | null>(null)
    const loginBox = ref<boolean>(false)
    const websocketStore = useWebSocketStore()
    const favStore = useFavStore()
    const showLogin = ()=>{
        loginBox.value = true
    }
    const hideLogin = ()=>{
        loginBox.value = false
    }
    const getMyInfo = async(token:string)=>{
        const result = await reqMyInfo(token)
        myInfo.value = result.data 
        //获取聊天信息
        websocketStore.initializeWebSocket()
        //获取收藏夹历史
        const favPage:FavPage = {
            uid:myInfo.value.uid,
            page:1,
            pageSize:10
        }
        favStore.getHistoreFavInfo(favPage)
    }
    const clearMyInfo = ()=>{
        myInfo.value = null
    }

    const logout = ()=>{
        clearMyInfo()
        removeToken()
        websocketStore.closeWebSocket()
        favStore.clearFavInfo()
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