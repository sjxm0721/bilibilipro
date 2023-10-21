import request from "@/utils/request";


enum API{
    HOMEVIEO_INFO = "/member/videopage"
}

import type{PageResponseData} from '../video/type'

export const reqMemberVideoPage=(uid:number,order:number,page:number,pageSize:number) =>
    request.get<any,PageResponseData>(API.HOMEVIEO_INFO,{
        params:{uid,order,page,pageSize}
    })


