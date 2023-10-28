import { ResponseData } from "../account/type";

export interface FavListPostInfo{
    uid?:number,
    isDic?:string,
    favTitle:string,
    favPoster:string,
    isPublic:string,
}

export interface FavList{
    favId?:number,
    uid:number,
    is_dic:string,
    videoId?:number,
    fatherDic?:number,
    favTitle?:string,
    favNum?:number,
    favPoster?:string,
    isPublic?:string,
    createTime?:string,
    name?:string,
    videoTitle?:string,
    lastTime?:number,
    videoPoster:string,
    fatherDicTitle?:string,
    videoUName?:string
}

export interface FavListResponseData extends ResponseData{
    data:FavList[]
}

export interface FavPage{
    uid:number,
    page:number,
    pageSize:number,
    fatherDic?:number
}

export interface PageFavData{
    record:FavList[],
    total:number
}

export interface PageFavResponseData extends ResponseData{
    data:PageFavData
}