import { ResponseData } from "../account/type";
import { Category } from "../category/type";

export interface PageInfoData{
    page:number,
    pageSize:number,
    order?:number,
    key?:string
}

export interface VideoSearchPageData{
    page:number,
    pageSize:number,
    order:number,
    searchContent:string
}

export interface Video{
    videoId:number,
    title:string,
    src:string,
    accountName?:string,
    postTime:string,
    barrageNum:number,
    lastTime:number,
    clickNum:number,
    uid:number,
    videoBrief:string,
    likeNum:number,
    coinNum:number,
    favNum:number,
    categoryTags:Category[],
    commentNum:number,
    poster:string,
    inSuggest:boolean,
    inCarousel:boolean
}

export interface PageVideoData{
    record:Video[],
    total:number
}

export interface PageResponseData extends ResponseData{
    data:PageVideoData
}

export interface HomeSuggestResponseData extends ResponseData{
    data:Video[]
}

export interface VideoInfoResponseData extends ResponseData{
    data:Video
}

export interface VideoRuleForm {
    poster: string;
    title: string;
    videoBrief: string;
    tags: string[];
    src: string;
    lastTime: number;
    uid:number
  }

export interface bilibiliUploadType{
    videoType:string,
    bid:string,
    pnum?:number,
    sessData?:string
  }
