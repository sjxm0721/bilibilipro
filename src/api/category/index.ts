import request from "@/utils/request";

enum API{
    HomeCategory_API = "/category/homecategory"
}

import type { CategoryResponseData } from "./type";


export const reqGetHomeCategory = ()=>
    request.get<any,CategoryResponseData>(API.HomeCategory_API)