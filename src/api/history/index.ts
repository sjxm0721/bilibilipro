import request from "@/utils/request";

import type { HistoryPageInfo,PageHistoryResponseData,HistoryPostInfo } from "./type";

enum API{
    HISTORY_PAGE_LIST_API = "/history/page",
    ADD_HISTORY_INFO_API = "/history/add",
}

export const reqGetHistoryPageList = (pageInfo:HistoryPageInfo)=>
    request.get<any,PageHistoryResponseData>(API.HISTORY_PAGE_LIST_API,{
        params:{
            uid:pageInfo.uid,
            page:pageInfo.page,
            pageSize:pageInfo.pageSize
        }
    })


export const reqAddHistoryInfo = (historyPostInfo:HistoryPostInfo)=>
    request.post<any,any>(API.ADD_HISTORY_INFO_API,historyPostInfo)