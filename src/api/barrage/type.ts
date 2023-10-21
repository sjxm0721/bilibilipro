import type { ResponseData } from "../account/type"
export interface BarrageData{
    barrageId:number,
    time:number,
    uid:number,
    likeNum:number,
    text:string,
    postTime:string,
    videoId:number,
    type:string,
    color:string,
    isMe?:boolean
}

export interface BarrageListResponseData extends ResponseData{
    data:BarrageData[]
}

export interface BarragePostData{
    time:number,
    uid:number,
    text:string,
    videoId:number,
    type:string,
    color:string,
}