//用户相关接口

import request from '@/utils/request'
import type {
    LoginFormData, LoginResponseData,AccountInfoResponseData
} from './type'

enum API {
    LOGIN_URL = '/account/login',
    MYINFO_URL = '/account/myinfo',
    ACCOUNTINFO_URL = '/account/info',
}

export const reqLogin = (data:LoginFormData)=>
    request.post<any,LoginResponseData>(API.LOGIN_URL,data)

export const reqMyInfo = (token:string)=>
    request.get<any,AccountInfoResponseData>(API.MYINFO_URL,{
        params:{token}
    })

export const reqGetAccountInfoById = (uid:number)=>
    request.get<any,AccountInfoResponseData>(API.ACCOUNTINFO_URL,{
        params:{uid}
    })
