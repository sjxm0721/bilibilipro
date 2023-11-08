// 点赞相关接口

import request from "@/utils/request";

import type { LikeInfoListResponseData,LikePostData } from "./type";

enum API {
    LIKE_LIST_URL = "/like/list",
    ADD_LIKE_URL = "/like/add",
    CANCEL_LIKE_URL = "/like/cancel",
}


export const reqGetLikeList = (uid:number,type:string)=>
    request.get<any,LikeInfoListResponseData>(API.LIKE_LIST_URL,{
        params:{
            uid,
            type
        }
    })

export const reqAddLike = (data:LikePostData)=>
    request.post<any,any>(API.ADD_LIKE_URL,data)

export const reqCancelLike = (data:LikePostData)=>
    request.post<any,any>(API.CANCEL_LIKE_URL,data);