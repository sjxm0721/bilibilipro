<template>
  <div class="read-item" @click="toReadInfo">
    <div class="left-content">
      <div class="title">{{ article.title }}</div>
      <div class="brief">{{ article.brief }}</div>
      <div class="info">
        <div class="avatar">
          <img :src="article.accountVO.avatar">
        </div>
        <div class="nick-name">
          {{ article.accountVO.accountName }}
        </div>
        <div class="category">
          {{ categoryChosed?.name }}
        </div>
        <div class="other-info">
          <span class="info-tags">
            <def-svg-icon svg-name="view" svg-color="#99A2AA" svg-height="16px" svg-width="16px"></def-svg-icon>
            &nbsp;<span>{{ article.clickNum }}</span>
          </span>
          <span class="info-tags">
            <def-svg-icon svg-name="like" svg-color="#99A2AA" svg-height="16px" svg-width="16px"></def-svg-icon>
            &nbsp;<span>{{ article.likeNum }}</span>
          </span>
          <span class="info-tags">
            <def-svg-icon svg-name="commentSolid" svg-color="#99A2AA" svg-height="16px" svg-width="16px"></def-svg-icon>
            &nbsp;<span>{{ article.commentNum }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="right-poster" :style="{'background-image': 'url('+article.poster +')'}"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps, reactive,computed } from 'vue';
import { Article } from '@/api/article/type';
import { useAccountStore } from '@/stores/modules/account';
const props = defineProps<{article:Article}>()
const accountStore = useAccountStore()
const router = useRouter();

const toReadInfo = () =>{
  router.push({
    name:'readInfo',
    params:{
      uid:accountStore.myInfo?.uid,
      readId:props.article.articleId
    }
  })
}

interface Category{
  id:number,
  name:string
}

const categoryChosed = computed(()=>{
  return categoryItems.find(item => item.id === props.article.category)
})

const categoryItems = reactive<Category[]>([
  {id:1,name:'动画'},
  {id:2,name:'游戏'},
  {id:3,name:'影视'},
  {id:4,name:'生活'},
  {id:5,name:'科技'},
  {id:6,name:'笔记'}
])

</script>

<style lang="scss" scoped>
.read-item {
  &:hover{
    cursor: pointer;
    & .left-content .title{
      color: #00A1D6;
    }
  }
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  .left-content {
    width: 78%;
    position: relative;
    .title {
      font-size: 22px;
      height: 26px;
      line-height: 26px;
      width: 85%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    .brief {
      color: #99a2aa;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      margin-top: 4px;
      width: 95%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    .info {
      height: 24px;
      line-height: 24px;
      position: absolute;
      bottom: 0;
      display: flex;
      .avatar{
        height: 24px;
        width: 24px;
        overflow: hidden;
        border-radius: 20px;
        img{
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .nick-name{
        margin-left: 5px;
        font-size: 12px;
        color: #99A2AA;
        line-height: 24px;
        max-width: 120px;
        margin-right: 24px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        vertical-align: center;
      }
      .category{
        font-size: 12px;
        padding: 0 5px 1px;
        margin-right: 25px;
        color: #99A2AA;
      }
      .other-info{
        .info-tags{
          margin-right: 25px;
          color: #99A2AA;
          font-size: 12px;
          display: inline-block;
          vertical-align: center;
        }
      }
    }
  }
  .right-poster {
    width: 18%;
    overflow: hidden;
    background-size: cover;
    border-radius: 4px;
    margin: 1px 0 2px;
    background-position: 50%;
    background-repeat: no-repeat;
  }
}
</style>
