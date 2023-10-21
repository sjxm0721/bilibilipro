<template>
  <div class="fav-list-show-container">
    <div class="top-brief">
      <div class="poster-container">
        <img src="@/assets/images/nagisa.jpg" />
        <div class="icon-poster">
          <el-icon><Collection color="#fff" /></el-icon>
        </div>
        <div class="icon-back"></div>
      </div>
      <div class="fav-list-info">
        <div class="title">默认文件夹</div>
        <div class="author">创建者：四季夏目</div>
        <div class="number-private">114个内容&nbsp;&nbsp;&nbsp;&nbsp;公开</div>
      </div>
    </div>
    <div class="fav-video-show">
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
      <div class="video-box">
        <def-video-fav-item></def-video-fav-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Collection } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.fav-list-show-container {
  .top-brief {
    display: flex;
    height: 119px;
    .poster-container {
      height: 119px;
      width: 190px;
      overflow: hidden;
      border-radius: 4px;
      position: relative;
      margin-right: 20px;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .icon-poster {
        position: absolute;
        z-index: 2;
        bottom: 4px;
        right: 4px;
        font-size: 20px;
      }
      .icon-back {
        height: 24px;
        width: 21px;
        position: absolute;
        bottom: 5px;
        right: 3px;
        background-color: rgba($color: #000000, $alpha: 0.4);
      }
    }
    .fav-list-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-weight: 700;
        font-size: 1.2em;
      }
      .author,
      .number-private {
        font-size: 0.9em;
        color: #99a2aa;
      }
    }
  }

  .fav-video-show {
    border-top: 1px solid #e5e9ef;
    margin-top: 30px;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 18% 18% 18% 18% 18%;
    grid-column-gap: 2%;
    overflow: hidden;
    .video-box {
      font-size: 11px;
      margin-top: 20px;
    }
  }
}
</style>
