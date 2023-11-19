import request from "@/utils/request";

enum API{
    USER_LIST_API = "/message/userlist",
    MESSAGE_SET_READ = "/message/isread" 
}

import type { AccountListResponseData } from "./type";

export const reqGetUserList = (uid:number)=>
    request.get<any,AccountListResponseData>(API.USER_LIST_API,{
        params:{uid}
    })

export const reqSetMessageRead = (data:number[])=>
    request.post<any,any>(API.MESSAGE_SET_READ,data)
