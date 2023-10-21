import { AccountInfoData, ResponseData } from "../account/type";

export interface AccountListResponseData extends ResponseData{
    data:AccountInfoData[]
}