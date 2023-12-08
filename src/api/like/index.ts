// 点赞相关接口

import request from "@/utils/request";

import type { LikeInfoListResponseData,LikePostData } from "./type";
import { PageResponseData } from "../video/type";

enum API {
    LIKE_LIST_URL = "/like/list",
    ADD_LIKE_URL = "/like/add",
    CANCEL_LIKE_URL = "/like/cancel",
    LIKE_VIDEO_PAGE_URL = "/like/videopage"
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

export const reqMemberLikeVideoPage = (uid:number,page:number,pageSize:number)=>
    request.get<any,PageResponseData>(API.LIKE_VIDEO_PAGE_URL,{
        params:{
            uid,
            page,
            pageSize
        }
    })