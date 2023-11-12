<template>
  <div class="show-video-container">
    <div class="right-video">
      <div class="video-nav">
        <span class="label">{{ accountStore.myInfo?.uid===memberStore.memberInfo?.uid?'我的视频':'TA的视频' }}</span>
        <div
          class="order-type"
          @click="changeOrder(0)"
          :class="{ choosed: videoPage.order === 0 }"
        >
          最新发布
        </div>
        <div
          class="order-type"
          @click="changeOrder(1)"
          :class="{ choosed: videoPage.order === 1 }"
        >
          最多播放
        </div>
        <div
          class="order-type"
          @click="changeOrder(2)"
          :class="{ choosed: videoPage.order === 2 }"
        >
          最多收藏
        </div>
      </div>
      <div class="video-body">
        <div
          class="video"
          v-for="item in videoPageResult?.record"
          :key="item.videoId"
        >
          <def-video-member-item :video="item"></def-video-member-item>
        </div>
      </div>
      <div class="video-pagination">
        <div class="demo-pagination-block" style="margin-left: 20%">
          <el-pagination
            v-model:current-page="videoPage.page"
            v-model:page-size="videoPage.pageSize"
            layout="pager,total, jumper"
            :background="true"
            :total="videoPageResult === undefined ? 0 : videoPageResult.total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VideoPage } from "@/api/member/type";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { PageVideoData } from "@/api/video/type";
import { reqMemberVideoPage } from "@/api/member";
import {useAccountStore} from '@/stores/modules/account'
import { useMemberStore } from "@/stores/modules/member";

const accountStore = useAccountStore()
const memberStore = useMemberStore()

const route = useRoute();

const changeOrder = (order: number) => {
  videoPage.value.order = order
  videoPage.value.page = 1
  getVideoPage();
};

//获取投稿视频列表分页数据
const videoPage = ref<VideoPage>({
  uid: Number(route.params.uid as string),
  order: 0,
  page: 1,
  pageSize: 10,
});
const videoPageResult = ref<PageVideoData>();
const getVideoPage = async () => {
  const { uid, order, page, pageSize } = videoPage.value;
  const res = await reqMemberVideoPage(uid, order, page, pageSize);
  videoPageResult.value = res.data;
};

onMounted(() => getVideoPage());


//当前页面发生变化
const handleCurrentChange=(page:number)=>{
  videoPage.value.page = page
  getVideoPage()
}
</script>

<style scoped lang="scss">
.show-video-container {
  .label {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #1296db;
    }
  }
  .right-video {
    .video-body {
      max-height: 520px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: 18% 18% 18% 18% 18%;
      grid-column-gap: 2%;
      overflow: hidden;
      .video {
        margin-bottom: 20px;
        font-size: 11px;
      }
    }
    .video-nav {
      .choosed {
        color: #1296db;
        border-bottom: 2px solid #1296db;
      }
      .order-type {
        display: inline-block;
        margin-left: 20px;
        padding-bottom: 10px;
        cursor: pointer;
      }
    }
    .video-pagination {
      margin-top: 30px;
      width: 100%;
    }
  }
}
</style>
