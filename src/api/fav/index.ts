import request from "@/utils/request";
import { FavListPostInfo, FavListResponseData, FavPage, PageFavResponseData ,FavVideoPostInfo} from "./type";

enum API{
    FATHER_FAV_LIST_API = "/fav/fatherlist",
    PAGE_FAV_LIST_API = "/fav/page",
    ADD_FATHER_FAV_API = "/fav/addlist",
    ADD_FAV_VIDEO_API = "/fav/addVideo",
    TOTAL_FAV_VIDEO_API = "/fav/totalFavVideo",
    DELETE_FAV_VIDEO_API = "/fav/deleteVideo",
    DELETE_FATHER_FAV_API = "/fav/deleteFatherFav"
}

export const reqGetFatherFavList = (uid:number) =>
    request.get<any,FavListResponseData>(API.FATHER_FAV_LIST_API,
        {
            params:{uid}
        })

export const reqGetPageFavList = (favPage:FavPage)=>
    request.get<any,PageFavResponseData>(API.PAGE_FAV_LIST_API,{
        params:{
            uid:favPage.uid,
            page:favPage.page,
            pageSize:favPage.pageSize,
            fatherDic:favPage.fatherDic
        }
    })

export const reqAddFatherFav = (formInfo:FavListPostInfo)=>
    request.post<any,any>(API.ADD_FATHER_FAV_API,formInfo);

export const reqAddFavVideo = (favVideoInfo : FavVideoPostInfo)=>
    request.post<any,any>(API.ADD_FAV_VIDEO_API,favVideoInfo)

export const reqTotalFavVideo = (uid:number)=>
    request.get<any,FavListResponseData>(API.TOTAL_FAV_VIDEO_API,{
        params:{
            uid
        }
    })
export const reqDeleteFavVideo = (uid:number,videoId:number)=>
    request.delete<any,any>(API.DELETE_FAV_VIDEO_API,{
        params:{
            uid,
            videoId
        }
    })
export const reqDeleteFatherFav = (favId:number)=>
    request.delete<any,any>(API.DELETE_FATHER_FAV_API,{
        params:{
            favId
        }
    })
