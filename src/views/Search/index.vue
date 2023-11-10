<template>
  <div class="search-container">
    <div class="search-header" :class="{ 'search-focus': searchStyle === 1 }">
      <def-svg-icon svg-name="search" svg-color="#06AEEC"></def-svg-icon>
      <input
        @blur="searchBlur"
        @click="searchFocus"
        type="text"
        placeholder="输入关键词搜索"
        class="search-input"
        @keyup.enter="searchVideo"
        v-model="videoSearchPageData.searchContent"
      />
      <el-button type="primary" size="large" class="search-button" @click="searchVideo"
        >搜索</el-button
      >
    </div>
    <div class="search-nav">
      <el-tabs v-model="activeNav" class="tabs" @tab-change="navChange">
        <el-tab-pane label="综合" name="comprehensive"></el-tab-pane>
        <el-tab-pane label="视频" name="video"></el-tab-pane>
        <el-tab-pane label="番剧" name="anime"></el-tab-pane>
        <el-tab-pane label="影视" name="movie"></el-tab-pane>
        <el-tab-pane label="直播" name="live"></el-tab-pane>
        <el-tab-pane label="专栏" name="column"></el-tab-pane>
        <el-tab-pane label="用户" name="user"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="search-order">
      <div
        class="order-box"
        @click="orderChange(0)"
        :class="{ 'active-order': videoSearchPageData.order === 0 }"
      >
        综合排序
      </div>
      <div
        class="order-box"
        @click="orderChange(1)"
        :class="{ 'active-order': videoSearchPageData.order === 1 }"
      >
        最多播放
      </div>
      <div
        class="order-box"
        @click="orderChange(2)"
        :class="{ 'active-order': videoSearchPageData.order === 2 }"
      >
        最新发布
      </div>
      <div
        class="order-box"
        @click="orderChange(3)"
        :class="{ 'active-order': videoSearchPageData.order === 3 }"
      >
        最多弹幕
      </div>
      <div
        class="order-box"
        @click="orderChange(4)"
        :class="{ 'active-order': videoSearchPageData.order === 4 }"
      >
        最多收藏
      </div>
    </div>
    <div class="main-content" v-if="videoPageList.length>0">
      <div class="content-box" v-for="item in videoPageList" :key="item.videoId">
        <def-video-item :video="item"></def-video-item>
      </div>
    </div>
    <div v-else style="height: 400px;">
      <img src="@/assets/images/empty.jpg" style="height: 100%;object-fit: contain;">
    </div>
    <div class="search-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total === undefined ? 0 :total"
        v-model:current-page="videoSearchPageData.page"
        v-model:page-size="videoSearchPageData.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { TabPaneName } from "element-plus";
import { useRoute } from "vue-router";
import type { Video, VideoSearchPageData } from "@/api/video/type";
import { reqSearchVideo } from "@/api/video";

const route = useRoute();
const searchStyle = ref(0);
const searchFocus = () => {
  searchStyle.value = 1;
};

const searchBlur = () => {
  searchStyle.value = 0;
};

const activeNav = ref("comprehensive");

const navChange = (name: TabPaneName) => {
  activeNav.value = name.toString();
};



const videoSearchPageData = reactive<VideoSearchPageData>({
  page: 1,
  pageSize: 25,
  order: 0,
  searchContent: route.query.keyword as string,
});


const videoPageList = ref<Video[]>([])
const total = ref<number>()
const searchVideo = async ()=>{
  const res = await reqSearchVideo(videoSearchPageData)
  videoPageList.value = res.data.record
  total.value = res.data.total
}

onMounted(()=>searchVideo())

//选择的排序发生变化时
const orderChange = (newOrder: number) => {
  videoSearchPageData.order = newOrder;
  searchVideo()
};

//当前页面发生变化
const handleCurrentChange=(page:number)=>{
  videoSearchPageData.page = page
  searchVideo()
}
</script>

<style scoped lang="scss">
.search-container {
  width: 100%;
  .search-focus {
    background-color: #fff !important;
    border: 1px solid #1296db !important;
    & .search-input {
      background-color: #fff !important;
    }
  }
  .search-header {
    position: relative;
    width: 400px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 5px;
    border-radius: 6px;
    background-color: #f6f7f8;
    border: 1px solid #fff;
    svg {
      margin: 0 15px;
    }
    .search-input {
      height: 40px;
      width: 200px;
      border: none;
      background-color: #f6f7f8;
      font-size: 1.3em;
    }
    .search-button {
      width: 80px;
      position: absolute;
      right: 10px;
    }
  }
  .search-nav {
    padding: 0 50px;
    border-bottom: 2px solid #f1f2f3;
    :deep() .el-tabs__header {
      margin-bottom: 5px;
    }
    :deep() .el-tabs__item {
      font-size: 1.2em;
      margin: 6px;
    }
    :deep() .el-tabs__nav-wrap::after {
      display: none;
    }
  }
  .search-order {
    width: 100%;
    height: 100px;
    padding: 25px 50px;
    display: flex;
    .active-order {
      background-color: #dff6fd;
      color: #06aeec !important;
    }
    .order-box {
      cursor: pointer;
      height: 36px;
      width: 90px;
      margin-right: 10px;
      line-height: 36px;
      text-align: center;
      border-radius: 8px;
      color: #61666d;
      transition: background-color 0.3s ease;
    }
  }
  .main-content {
    width: 100%;
    // height: 1000px;
    padding: 0 50px;
    display: grid;
    grid-template-columns: 18% 18% 18% 18% 18%;
    grid-auto-flow: row dense;
    grid-column-gap: 2%;
    // overflow: hidden;
    .content-box {
      font-size: 13px;
      height: 200px;
      margin-bottom: 30px;
    }
  }
  .search-pagination {
    width: 30%;
    margin: 20px auto;
  }
}
</style>
