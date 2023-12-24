import { Article,ArticleRuleForm,ArticlePostData } from "@/api/article/type";
import { reqAddArticle, reqArticleList } from "@/api/article/index";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useArticleStore = defineStore(
  "article",
  () => {
    const categoryCenter = ref<number>(0);
    const searchText = ref<string>("");

    const articleRankPost = reactive<ArticlePostData>({
      category:0,
      uid:0,
      chosedTime:0,
      title:"",
      chosedOrder:0,
    }) 

    //排行榜数据
    const articleRankList = ref<Article[]>([]);

    //展示中间的文章数据
    const articleList = ref<Article[]>([]);
    const addArticle = async (articlePost:ArticleRuleForm)=>{
        await reqAddArticle(articlePost);
    
    }

    const getCenterArticleList = async (articleQueryData:ArticlePostData) => {
        const res = await reqArticleList(articleQueryData)
        if(res.code === 200){
            articleList.value = res.data;
        }
    }

    const getArticleRankList = async () =>{
        const res = await reqArticleList(articleRankPost);
        if(res.code === 200){
            articleRankList.value = res.data;
        }
    }
   
    return {
     addArticle,
     articleList,
     getCenterArticleList,
     getArticleRankList,
     articleRankPost,
     articleRankList,
     categoryCenter,
     searchText
    };
  },
  {
    persist: true, //持久化配置
  }
);
