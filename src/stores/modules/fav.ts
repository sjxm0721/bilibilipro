import { reqGetPageFavList,reqGetFatherFavList, reqTotalFavVideo } from "@/api/fav";
import type { FavList, FavPage } from "@/api/fav/type";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAccountStore } from "./account";


export const useFavStore = defineStore('fav',()=>{
    const historeFavInfo = ref<FavList[]>([])
    const fatherFavList = ref<FavList[]>([])
    const totalFavVideo = ref<FavList[]>([])
    const accountStore = useAccountStore()

    const getFatherFavList = async () => {
        const res = await reqGetFatherFavList(accountStore.myInfo?.uid!);
        fatherFavList.value = res.data;
      };

    const getHistoreFavInfo = async (favPage:FavPage)=>{
        const res = await reqGetPageFavList(favPage)
        historeFavInfo.value = res.data.record
    }

    const getTotalFavVideo = async () =>{
        const res = await reqTotalFavVideo(accountStore.myInfo?.uid!);
        totalFavVideo.value = res.data
    }

    const clearFavInfo = ()=>{
        historeFavInfo.value =[]
        fatherFavList.value = []
        totalFavVideo.value = []
    }

    return{
        historeFavInfo,
        fatherFavList,
        totalFavVideo,
        getTotalFavVideo,
        getFatherFavList,
        getHistoreFavInfo,
        clearFavInfo
    }
},{
    persist:true
})