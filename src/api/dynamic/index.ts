import request from "@/utils/request";

import type { DynamicPageInfo,DynamicPageResponseData,DynamicPostData } from "./type";


enum API{
    DYNAMIC_PAGE_API = "/dynamic/page",
    PUBLISH_DYNAMIC_API = "/dynamic/add",
    DELETE_DYNAMIC_API = "/dynamic/delete"
}

export const reqGetDynamicPageInfo = (pageInfo:DynamicPageInfo)=>
    request.get<any,DynamicPageResponseData>(API.DYNAMIC_PAGE_API,{
        params:{
            page:pageInfo.page,
            pageSize:pageInfo.pageSize,
            uid:pageInfo.uid
        }
    })

export const reqPublishDynamic = (data:DynamicPostData)=>
    request.post<any,any>(API.PUBLISH_DYNAMIC_API,data)

export const reqDeleteDynamic = (dynamicId:number) =>
    request.delete<any,any>(API.DELETE_DYNAMIC_API,{
        params:{
            dynamicId
        }
    })