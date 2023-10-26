import request from "@/utils/request";

enum API {
  FOLLOW_PAGE_LIST_API = "/follow/getfollow",
  FANS_PAGE_LIST_API = "/follow/getfans",
  ADD_FOLLOW_API = "/follow/add",
  CANCEL_FOLLOW_API = "/follow/cancel",
  IS_FOLLOW_API = "/follow/isfollow"
}

import type {
  FollowInfo,
  FollowPageInfo,
  IsFollow,
  PageFollowResponseData,
} from "./type";

export const reqGetFollowPageList = (pageInfo: FollowPageInfo) =>
  request.get<any, PageFollowResponseData>(API.FOLLOW_PAGE_LIST_API, {
    params: {
      page: pageInfo.page,
      pageSize: pageInfo.pageSize,
      uid: pageInfo.uid,
    },
  });

export const reqGetFansPageList = (pageInfo: FollowPageInfo) =>
  request.get<any, PageFollowResponseData>(API.FANS_PAGE_LIST_API, {
    params: {
      page: pageInfo.page,
      pageSize: pageInfo.pageSize,
      uid: pageInfo.uid,
    },
  });

export const reqAddFollow = (followInfo: FollowInfo) =>
  request.post<any, any>(API.ADD_FOLLOW_API, followInfo);

export const reqCancelFollow = (followInfo:FollowInfo)=>
  request.post<any,any>(API.CANCEL_FOLLOW_API,followInfo);


export const reqIsFollow = (followerUid:number,followedUid:number) =>
  request.get<any,IsFollow>(API.IS_FOLLOW_API,{
    params:{followerUid,followedUid}
  })
