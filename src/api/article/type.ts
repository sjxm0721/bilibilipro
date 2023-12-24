import { AccountInfoData,ResponseData } from "../account/type"
import { Category } from "../category/type"

export interface ArticleRuleForm{
    title:string,
    content:string,
    poster:string,
    tags:string[],
    category:string
}

export interface Article{
    articleId:number,
    uid:number,
    category:number,
    clickNum:number,
    likeNum:number,
    commentNum:number,
    postTime:string,
    title:string,
    content:string,
    poster:string,
    tags:Category[],
    accountVO:AccountInfoData,
    brief:string
}

export interface ArticleListResponseData extends ResponseData {
    data:Article[] // 文章列表
}

export interface ArticleDetailResponseData extends ResponseData {
    data:Article // 文章详情
}

export interface ArticlePostData{
    category:number,
    uid:number,
    chosedTime:number,
    title:string,
    chosedOrder:number,
}