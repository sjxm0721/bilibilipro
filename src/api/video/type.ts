import { ResponseData } from "../account/type";

export interface PageInfoData{
    page:number,
    pageSize:number,
    order?:number,
    key?:string
}

export interface VideoBox{
    videoId:number,
    title:string,
    poster:string,
    clickNum:number,
    barrageNum:number,
    lastTime:number,
    videoBrief:string,
    uid:number,
    accountName:string,
    postTime:string
}

export interface Video{
    videoId:number,
    title:string,
    src:string,
    postTime:string,
    barrageNum:number,
    lastTime:number,
    clickNum:number,
    uid:number,
    videoBrief:string,
    likeNum:number,
    coinNum:number,
    favNum:number,
    tags:string[],
    commentNum:number,
    poster:string,
    inSuggest:boolean,
    inCarousel:boolean
}

export interface PageVideoData{
    record:VideoBox[],
    total:number
}

export interface PageResponseData extends ResponseData{
    data:PageVideoData
}

export interface HomeSuggestResponseData extends ResponseData{
    data:VideoBox[]
}

export interface VideoInfoResponseData extends ResponseData{
    data:Video
}

