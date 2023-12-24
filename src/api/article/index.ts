import request from '@/utils/request'

import type{
    ArticleRuleForm,
    ArticlePostData,
    ArticleListResponseData,
    ArticleDetailResponseData
} from './type'

enum API {
    ARTICLE_ADD_URL = '/article/add',
    ARTICLE_LIST_URL = '/article/list',
    ARTICLE_DETAIL_URL = '/article',
}

export const reqAddArticle = (data: ArticleRuleForm) => 
    request.post<any,any>(API.ARTICLE_ADD_URL, data)

export const reqArticleList = (data:ArticlePostData) =>
    request.post<any,ArticleListResponseData>(API.ARTICLE_LIST_URL, data)

export const reqArticleDetail = (articleId:number) =>
    request.get<any,ArticleDetailResponseData>(API.ARTICLE_DETAIL_URL + `/${articleId}`)
