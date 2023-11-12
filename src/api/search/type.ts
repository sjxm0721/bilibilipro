import { ResponseData } from "../account/type"

export interface SearchInfo{
    searchId?:number,
    searchContent:string,
    searchNum:number
}

export interface PageSearchInfo{
    record:SearchInfo[],
    total:number
}

export interface PageSearchResponseData extends ResponseData{
    data:PageSearchInfo
}

export interface SearchPostInfo{
    searchContent:string
}