import request from "@/utils/request";

import type { CommentPageInfo, CommentPageResponseData, CommentReplyResponseData, ReplyCommentInfo } from "./type";

enum API{
    COMMENT_PAGE_API = "/comment/page",
    REPLY_COMMENT_API = "/comment/reply",
    DELETE_REPLY_API = "/comment/delete"
}

export const reqGetCommentPageList = (pageInfo:CommentPageInfo)=>
    request.get<any,CommentPageResponseData>(API.COMMENT_PAGE_API,
        {
            params:{
                page:pageInfo.page,
                pageSize:pageInfo.pageSize,
                order:pageInfo.order,
                dynamicId:pageInfo.dynamicId,
                videoId:pageInfo.videoId
            }
        })

export const reqReplyComment = (replyCommentInfo:ReplyCommentInfo)=>
        request.post<any,CommentReplyResponseData>(API.REPLY_COMMENT_API,replyCommentInfo)

export const reqDeleteComment = (commentId:number)=>
        request.delete<any,any>(API.DELETE_REPLY_API,{
            params:{
                commentId
            }
        })