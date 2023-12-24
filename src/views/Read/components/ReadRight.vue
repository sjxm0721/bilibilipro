<template>
  <div class="read-right-main" :class="[{ scroll: y > 50 }]">
    <div class="top-search">
      <el-input
        v-model="articleStore.searchText"
        class="w-50 m-2"
        size="large"
        placeholder="搜索专栏文章"
        :suffix-icon="Search"
      />
    </div>
    <div class="rank">
      <div
        style="font-size: 18px; font-weight: bold; transform: translateY(100%)"
      >
        排行榜
      </div>
      <el-tabs v-model="articleStore.articleRankPost.chosedTime" class="demo-tabs">
        <el-tab-pane label="今天" :name="1"></el-tab-pane>
        <el-tab-pane label="昨天" :name="2"></el-tab-pane>
        <el-tab-pane label="周榜" :name="3"></el-tab-pane>
        <el-tab-pane label="月榜" :name="4"></el-tab-pane>
      </el-tabs>
      <div class="rank-body">
        <div class="rank-content" v-for="(item,index) in articleStore.articleRankList" :key="item.articleId">
          <div class="rank-value">{{ index }}</div>
          <div class="rank-title">{{ item.title }}</div>
        </div>
        <div class="check-more">查看完整榜单</div>
      </div>
    </div>
    <div class="more">
      <div style="margin: 25px 0 15px; font-size: 18px; font-weight: bold">
        更多
      </div>
      <hr style="background-color: #e5e7ed; height: 2px; border: none" />
      <div class="more-body">
        <div class="left-pic">
          <img src="../../../assets/pics/write.jpg" />
        </div>
        <div class="right-content">
          <div class="top" @click="toUpload">专栏投稿</div>
          <div class="bottom">前去写文章</div>
        </div>
      </div>
      <div class="more-body">
        <div class="left-pic">
          <img src="../../../assets/pics/readAbout.jpg" />
        </div>
        <div class="right-content">
          <div class="top">专栏帮助</div>
          <div class="bottom">查看专栏使用说明</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useScroll } from "@vueuse/core";
import { useArticleStore } from "@/stores/modules/article";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/modules/account";

const accountStore = useAccountStore();
const articleStore = useArticleStore();
const { y } = useScroll(window);
const router = useRouter();

watch(()=>articleStore.articleRankPost.chosedTime,()=>{
  articleStore.getArticleRankList();
},{immediate:true,deep:true})

//前往投稿页面
const toUpload = () => {
  router.push({
    name:"upload",
    params:{uid:accountStore.myInfo?.uid}
  });
}

</script>

<style lang="scss" scoped>
:deep() .el-tabs__nav {
  transform: translateX(70px) !important;
}
.scroll {
  transform: translateY(-50px);
  transition: .2s;
}
.read-right-main {
  position: fixed;
  width: 350px;
  padding: 20px 20px;
  .top-search {
    width: 80%;
    margin: 0 auto;
  }
  .rank {
    margin-top: 20px;
    .rank-body {
      .rank-content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .rank-value {
          width: 15%;
          text-align: center;
        }
        .rank-title {
          width: 80%;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
        }
      }
      .check-more {
        width: 100%;
        text-align: center;
        background-color: #eee;
        font-size: 15px;
        padding: 8px;
        border-radius: 5px;
      }
    }
  }
  .more {
    .more-body {
      margin: 20px 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      .left-pic {
        width: 18%;
        img {
          width: 80%;
          height: 80%;
          object-fit: contain;
        }
      }
      .right-content {
        .top {
          margin-bottom: 8px;
          font-size: 16px;
        }
        .bottom {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
