
import { defineStore } from "pinia";
import { AccountInfoData } from "@/api/account/type";
import { ref } from "vue";
import { reqGetAccountInfoById } from "@/api/account";

export const useMemberStore = defineStore('member',()=>{
    const memberInfo = ref<AccountInfoData | null>(null)
    const getMemberInfo = async(uid:number)=>{
        const result = await reqGetAccountInfoById(uid)
        memberInfo.value = result.data 
    }
    return {
        getMemberInfo,
        memberInfo
    }
},{
    persist:true//持久化配置
})