import request from "@/utils/request";

enum API{
    USER_LIST_API = "/message/userlist" 
}

import type { AccountListResponseData } from "./type";

export const reqGetUserList = (uid:number)=>
    request.get<any,AccountListResponseData>(API.USER_LIST_API,{
        params:{uid}
    })