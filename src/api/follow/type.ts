import { ResponseData } from "../account/type"

export interface FollowList{
    followId:number,
    followerUid:number,
    followerName?:string,
    followerAvatar?:string,
    followerBrief?:string,
    followedUid:number,
    followedName?:string,
    followedAvatar?:string,
    followedBrief?:string,
    createTime:string
}

export interface FollowPageInfo{
    page:number,
    pageSize:number,
    uid:number
}

export interface PageFollowData{
    record:FollowList[],
    total:number
}

export interface PageFollowResponseData extends ResponseData{
    data:PageFollowData
}

export interface FollowInfo{
    followerUid:number,
    followedUid:number
}

export interface IsFollow extends ResponseData{
    data:boolean
}