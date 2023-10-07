//用户相关接口

import request from '../../utils/request'
import type {
    LoginFormData, LoginResponseData,MyInfoResponseData
} from './type'

enum API {
    LOGIN_URL = '/account/login',
    MYINFO_URL = '/account/myinfo'
}

export const reqLogin = (data:LoginFormData)=>
    request.post<any,LoginResponseData>(API.LOGIN_URL,data)

export const reqMyInfo = (token:string)=>
    request.get<any,MyInfoResponseData>(API.MYINFO_URL,{
        params:{token}
    })
