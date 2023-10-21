//视频相关接口
import request from "@/utils/request";
import type {
  PageInfoData,
  PageResponseData,
  HomeSuggestResponseData,
  VideoInfoResponseData,
} from "./type";

enum API {
  PAGE_API = "/video/page",
  HOME_SUGGEST_API = "/video/homesuggest",
  VIDEO_INFO_API = "/video/info",
}

export const reqGetVideoPageList = (data: PageInfoData) =>
  request.post<any, PageResponseData>(API.PAGE_API, data);

export const reqVideoInSuggest = () =>
  request.get<any, HomeSuggestResponseData>(API.HOME_SUGGEST_API);

export const reqGetVideoInfoByUid = (videoId: number) =>
  request.get<any, VideoInfoResponseData>(API.VIDEO_INFO_API, {
    params: { videoId },
  });


