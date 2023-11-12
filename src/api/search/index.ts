import request from "@/utils/request";

enum API{
    SEARCH_PAGE_LIST_API = "/search/list",
    SEARCH_ADD_API = "/search/add"
}

import type{ PageSearchResponseData, SearchPostInfo } from './type'

export const reqSearchPageList = (page:number,pageSize:number)=>
    request.get<any,PageSearchResponseData>(API.SEARCH_PAGE_LIST_API,{
        params:{
            page,
            pageSize
        }
    })

export const reqAddSearch = (data:SearchPostInfo)=>
    request.put<any,any>(API.SEARCH_ADD_API,data)