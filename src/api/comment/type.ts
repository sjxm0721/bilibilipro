import { ResponseData } from "../account/type";
import { PageInfoData } from "../video/type";

export interface CommentData{
    commentId:number,
    uid:number,
    videoId?:number,
    dynamicId?:number,
    fatherId?:number,
    totalFatherId?:number,
    content:string,
    postTime:string,
    likeNum:number,
    avatar:string,
    accountName:string,
    subComment:CommentData[],
    responseName:string
}

export interface PageComment{
    record:CommentData[],
    total:number
}

export interface CommentPageResponseData extends ResponseData{
    data:PageComment
}

export interface CommentPageInfo extends PageInfoData{
    videoId?:number,
    dynamicId?:number
}

export interface ReplyCommentInfo{
    uid:number,
    content:string,
    videoId?:number,
    dynamicId?:number,
    fatherId?:number,
    totalFatherId?:number,
    accountName?:string
}