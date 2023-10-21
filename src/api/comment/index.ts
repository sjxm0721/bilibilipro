import request from "@/utils/request";

import type { CommentPageInfo, CommentPageResponseData, ReplyCommentInfo } from "./type";

enum API{
    COMMENT_PAGE_API = "/comment/page",
    REPLY_COMMENT_API = "/comment/reply"
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
        request.post<any,any>(API.REPLY_COMMENT_API,replyCommentInfo)