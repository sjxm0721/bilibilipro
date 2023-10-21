import { ResponseData } from "../account/type";

export interface Category{
    categoryId:number,
    name:string
}

export interface CategoryResponseData extends ResponseData{
    data:Category[]
}