//视频相关接口
import request from "@/utils/request";
import type {
  PageInfoData,
  PageResponseData,
  HomeSuggestResponseData,
  VideoInfoResponseData,
  VideoSearchPageData,
  VideoRuleForm
} from "./type";

enum API {
  PAGE_API = "/video/page",
  HOME_SUGGEST_API = "/video/homesuggest",
  VIDEO_INFO_API = "/video/info",
  VIDEO_CLICK_API = "/video/click",
  VIDEO_SEARCH_API = "/video/search",
  VIDEO_ADD_API = "/video/add"
}

export const reqGetVideoPageList = (data: PageInfoData) =>
  request.post<any, PageResponseData>(API.PAGE_API, data);

export const reqVideoInSuggest = () =>
  request.get<any, HomeSuggestResponseData>(API.HOME_SUGGEST_API);

export const reqGetVideoInfoByUid = (videoId: number) =>
  request.get<any, VideoInfoResponseData>(API.VIDEO_INFO_API, {
    params: { videoId },
  });

export const reqClickVideo = (videoId:number)=>
  request.get<any,any>(API.VIDEO_CLICK_API,{
    params:{videoId}
  })

export const reqSearchVideo = (videoSearchPageData:VideoSearchPageData)=>
  request.get<any,PageResponseData>(API.VIDEO_SEARCH_API,{
    params:{
      page:videoSearchPageData.page,
      pageSize:videoSearchPageData.pageSize,
      order:videoSearchPageData.order,
      searchContent:videoSearchPageData.searchContent
    }
  })

export const reqAddVideo = (data:VideoRuleForm) =>
  request.post<any,any>(API.VIDEO_ADD_API,data)


