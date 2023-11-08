import { defineStore } from "pinia";
import { ref } from "vue";
import type { LikeInfoData } from "@/api/like/type";
import { reqGetLikeList } from "@/api/like";

export const useLikeStore = defineStore('like',()=>{
    const videoLikeList = ref<LikeInfoData[]>([])
    const dynamicLikeList = ref<LikeInfoData[]>([])
    const commentLikeList = ref<LikeInfoData[]>([])
    const barrageLikeList = ref<LikeInfoData[]>([])

    const getLikeList = async (uid:number,type:string)=>{
        const res = await reqGetLikeList(uid,type)
        if(type=='0'){
            videoLikeList.value = res.data
        }
        else if(type=='1'){
            dynamicLikeList.value = res.data
        }
        else if(type == '2'){
            commentLikeList.value = res.data
        }
        else{
            barrageLikeList.value = res.data
        }
    }

    const clearLikeList = ()=>{
        videoLikeList.value = []
        dynamicLikeList.value = []
        commentLikeList.value = []
        barrageLikeList.value = []
    }

    return{
       getLikeList,
       clearLikeList,
       videoLikeList,
       dynamicLikeList,
       commentLikeList,
       barrageLikeList
    }
},{
    persist:true
})