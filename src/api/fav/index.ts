import request from "@/utils/request";
import { FavListPostInfo, FavListResponseData, FavPage, PageFavResponseData } from "./type";

enum API{
    FATHER_FAV_LIST_API = "/fav/fatherlist",
    PAGE_FAV_LIST_API = "/fav/page",
    ADD_FATHER_FAV_API = "/fav/addlist"
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
