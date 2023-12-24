<template>
  <div class="read-info-container" v-if="articleDetail">
    <div class="read-info-body">
      <div class="content">
        <div class="article-title">
            {{ articleDetail.title }}
        </div>
        <div class="article-info">
          {{articleDetail.postTime}}&nbsp;&nbsp;&nbsp;{{articleDetail.clickNum}}浏览 · {{articleDetail.likeNum}}喜欢 · {{articleDetail.commentNum}}评论
        </div>
        <div class="article-author">
          <div class="author-info">
            <div class="avatar">
              <img :src="articleDetail.accountVO.avatar" />
            </div>
            <div class="font-info">
              <div class="author-name">{{ articleDetail.accountVO.accountName }}</div>
              <div class="author-value">
                粉丝：{{articleDetail.accountVO.fansNum}}&nbsp;&nbsp;&nbsp;文章：137
              </div>
            </div>
          </div>
          <div>
            <el-button type="primary" :icon="Plus" style="width: 120px"
              >关注</el-button
            >
          </div>
        </div>
        <div class="poster" v-if="articleDetail.poster">
          <img :src="articleDetail.poster" />
        </div>
        <hr style="height: 1px; background-color: #e9e9e9; border: none" />
        <div class="article-main">
          <!-- 正文部分 -->
          <v-md-preview :text="articleDetail.content"></v-md-preview>
        </div>
        <div v-if="articleDetail.tags.length>0">
          <el-tag v-for="item in articleDetail.tags" :key="item.categoryId" class="ml-2" type="info" style="margin-right: 10px;">{{ item.name }}</el-tag>
        </div>
        <div class="article-attention">本文为我原创 本文禁止转载或摘编</div>
        <hr style="height: 1px; background-color: #e9e9e9; border: none" />
      </div>
    </div>
    <div class="article-comment">
      <def-comment></def-comment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { ref,onMounted } from "vue";
import { useRoute } from "vue-router";
import { reqArticleDetail } from "@/api/article";
import { Article } from "@/api/article/type";
const route = useRoute();

const articleDetail = ref<Article>()
const getArticleDetail = async () => {
  const res = await reqArticleDetail(parseInt(route.params.readId as string));
  if(res.code === 200){
    articleDetail.value = res.data
    console.log(articleDetail.value)
  }
}

onMounted(()=>{
  getArticleDetail()
})

</script>

<style scoped lang="scss">
.read-info-container {
  background-color: #f6f7f9;
  padding: 40px;
  .read-info-body {
    margin: 0 auto;
    width: 900px;
    background-color: #fff;
    border-radius: 5px;
    .content {
      padding: 40px 120px;
      .article-title {
        font-size: 28px;
        font-weight: bold;
        line-height: 40px;
      }
      .article-info {
        color: #999;
        margin: 20px 0;
        line-height: 18px;
      }
      .article-author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 25px 0;
        .author-info {
          display: flex;
          align-items: center;
          .avatar {
            width: 44px;
            height: 44px;
            margin-right: 20px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }
          }
          .font-info {
            .author-name {
              line-height: 24px;
            }
            .author-value {
              line-height: 24px;
              color: #999;
            }
          }
        }
      }
      .poster {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          margin-bottom: 40px;
        }
      }
      .article-main {
        margin: 50px 0;
      }
      .article-attention {
        color: #ddd;
        margin: 40px 0;
      }
    }
  }
  .article-comment {
    margin: 10px auto;
    width: 900px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px 40px;
  }
}
</style>
