import request from "@/utils/request";

import type { DynamicPageInfo,DynamicPageResponseData } from "./type";


enum API{
    DYNAMIC_PAGE_API = "/dynamic/page"
}

export const reqGetDynamicPageInfo = (pageInfo:DynamicPageInfo)=>
    request.get<any,DynamicPageResponseData>(API.DYNAMIC_PAGE_API,{
        params:{
            page:pageInfo.page,
            pageSize:pageInfo.pageSize,
            uid:pageInfo.uid
        }
    })