import { reqAddHistoryInfo, reqGetHistoryPageList } from "@/api/history";
import type { HistoryPageInfo, HistoryInfo, HistoryPostInfo } from "@/api/history/type";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAccountStore } from "./account";


export const useHistoryStore = defineStore('history',()=>{
    const historyPageList = ref<HistoryInfo[]>([])
    const accountStore = useAccountStore()

    const getHistoryPageInfo = async (pageInfo:HistoryPageInfo)=>{
        const res = await reqGetHistoryPageList(pageInfo)
        historyPageList.value = res.data.record
    }

    const addHistoryPageList = async (historyPostInfo:HistoryPostInfo)=>{
        const res = await reqAddHistoryInfo(historyPostInfo)
        if(res.code==200){
            let pageInfo:HistoryPageInfo = {
                page:1,
                pageSize:10,
                uid:accountStore.myInfo?.uid!
            }
            getHistoryPageInfo(pageInfo)
        }
    }

    const clearHistoryPageInfo = ()=>{
        historyPageList.value =[]
    }

    return{
        historyPageList,
        getHistoryPageInfo,
        clearHistoryPageInfo,
        addHistoryPageList
    }
},{
    persist:true
})