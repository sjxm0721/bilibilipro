import { ResponseData } from "../account/type"

export interface LikeInfoData{
    likeId?:number,
    fromUid:number,
    toUid:number,
    type:string,
    videoId?:number,
    dynamicId?:number,
    commentId?:number,
    barrageId?:number,
    status:string,
    createTime?:string,
    updateTime?:string
}

export interface LikeInfoListResponseData extends ResponseData{
    data:LikeInfoData[]
}

export interface LikePostData{
    fromUid:number,
    toUid:number,
    type:string,
    videoId?:number,
    dynamicId?:number,
    commentId?:number,
    barrageId?:number,
    status:string
}