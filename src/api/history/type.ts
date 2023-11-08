export interface HistoryInfo{
    historyId:number,
    uid:number,
    videoId:number,
    createTime:string,
    videoTitle:string,
    videoPoster:string,
    lastTime:number,
    accountName:string
}

export interface HistoryPageInfo{
    page:number,
    pageSize:number,
    uid:number
}

export interface PageHistoryData{
    record:HistoryInfo[],
    total:number
}

export interface PageHistoryResponseData{
    data:PageHistoryData
}

export interface HistoryPostInfo{
    uid:number,
    videoId:number,
}