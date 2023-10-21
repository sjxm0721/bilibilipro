import request from "@/utils/request"

import type{
    BarragePostData,
    BarrageListResponseData
} from './type'

enum API{
    BARRAGE_LIST_API = "/barrage/list",
    SEND_BARRAGE_API = "/barrage/send"
}

export const reqGetVideoBarrage = (videoId: number) => 
    request.get<any,BarrageListResponseData>(API.BARRAGE_LIST_API,{
        params:{videoId}
    });

export const reqSendBarrage = (data:BarragePostData)=>
    request.post<any,any>(API.SEND_BARRAGE_API,data)