import { ResponseData } from "../account/type"

export interface DynamicPageInfo {
    page:number,
    pageSize:number,
    uid?:number
}

export interface DynamicData{
    dynamicId:number,
    uid:number,
    postTime:string,
    text:string,
    videoId?:number,
    likeNum:number,
    commentNum:number,
    avatar:string,
    accountName:string,
    title?:string,
    lastTime?:number,
    clickNum?:number,
    barrageNum?:number,
    videoBrief?:string,
    poster?:string
}

export interface PageDynamic{
    total:number,
    record:DynamicData[]
}

export interface DynamicPageResponseData extends ResponseData{
    data:PageDynamic
}