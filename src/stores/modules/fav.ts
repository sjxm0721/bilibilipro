import { reqGetPageFavList } from "@/api/fav";
import type { FavList, FavPage } from "@/api/fav/type";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useFavStore = defineStore('fav',()=>{
    const historeFavInfo = ref<FavList[]>([])

    const getHistoreFavInfo = async (favPage:FavPage)=>{
        const res = await reqGetPageFavList(favPage)
        historeFavInfo.value = res.data.record
    }

    const clearFavInfo = ()=>{
        historeFavInfo.value =[]
    }

    return{
        historeFavInfo,
        getHistoreFavInfo,
        clearFavInfo
    }
},{
    persist:true
})