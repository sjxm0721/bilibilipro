//登陆接口需要携带的参数类型
export interface LoginFormData {
    accountId?:string
    password?:string
}

export interface ResponseData {
    code:number,
    msg?:string
}

export interface AccountInfoData {
    uid:number,
    accountId:string,
    birthday:string,
    avatar:string,
    accountName:string,
    followNum:number,
    fansNum:number,
    dynamicNum:number,
    accountBrief:string,
    likeNum:number,
    clickNum:number
}

export interface LoginResponseData extends ResponseData{
    data?:string
}

export interface AccountInfoResponseData extends ResponseData{
    data:AccountInfoData
}