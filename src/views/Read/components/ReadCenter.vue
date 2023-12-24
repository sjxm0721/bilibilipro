<template>
  <div class="read-center-main">
    <div class="title">动画</div>
    <div>
      <el-dropdown trigger="click" style="cursor: pointer;" @command="chooseOrder">
        <span class="el-dropdown-link">
          {{ orderChosed?.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="item.id" v-for="item in orderList" :key="item.id">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="article-content" v-if="articleStore.articleList">
      <div class="article-body" v-for="item in articleStore.articleList" :key="item.articleId">
        <def-read-item :article="item"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import {reactive, ref, computed,watch} from "vue";
import { useArticleStore } from "@/stores/modules/article";
import { ArticlePostData } from "@/api/article/type";
import { DefReadItem } from "@/components";
import _debounce from "lodash/debounce";
const articleStore = useArticleStore()

interface order{
  id:number,
  name:string
}

const orderList = ref<order[]>([
  {id:0,name:'默认排序'},
  {id:1,name:'投稿时间排序'},
  {id:2,name:'评论数最多'},
  {id:3,name:'点赞数最多'},
])

const orderChosed = computed(()=>{
  return orderList.value.find(item=>item.id===articlePostData.chosedOrder)
})

const articlePostData = reactive<ArticlePostData>({
    category:articleStore.categoryCenter,
    uid:0,
    chosedTime:0,
    title:"",
    chosedOrder:0,
})

//选择排序顺序
const chooseOrder = (order:any)=>{
  articlePostData.chosedOrder = order
}

//获取中间文章数据
const getArticleCenter = ()=>{
  articleStore.getCenterArticleList(articlePostData)
}

watch(()=>articleStore.categoryCenter,(newValue,__)=>{
  articlePostData.category = newValue
  getArticleCenter()
},{immediate:true})

const debouncedGetArticleCenter = _debounce(() => {
  getArticleCenter()
  console.log('debouncedGetArticleCenter')
},500); 

watch(()=>articleStore.searchText,(newValue,__)=>{
  articlePostData.title = newValue
  debouncedGetArticleCenter()
},{immediate:true})

</script>

<style lang="scss" scoped>
.read-center-main {
  width: 100%;
  padding: 30px 0;
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  .article-content{
    display: block;
    overflow: auto;
    .article-body{
      margin: 15px 0;
      height: 132px;
      border-bottom: 1px solid #F4F5F7;
    }
  }
}
</style>
