<template>
  <div class="show-video-container">
    <div class="right-video">
      <div class="video-nav">
        <span class="label">我的视频</span>
        <div
          class="order-type"
          @click="changeOrder(0)"
          :class="{ choosed: choosedOrder === 0 }"
        >
          最新发布
        </div>
        <div
          class="order-type"
          @click="changeOrder(1)"
          :class="{ choosed: choosedOrder === 1 }"
        >
          最多播放
        </div>
        <div
          class="order-type"
          @click="changeOrder(2)"
          :class="{ choosed: choosedOrder === 2 }"
        >
          最多收藏
        </div>
      </div>
      <div class="video-body">
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
        <div class="video">
          <def-video-member-item></def-video-member-item>
        </div>
      </div>
      <div class="video-pagination">
        <div class="demo-pagination-block">
          <el-pagination
            current-page="1"
            page-size="10"
            page-sizes="[100, 200, 300, 400]"
            layout="pager,total, jumper"
            background="true"
            :total="200"
          />
          <!-- :small="small"
            :disabled="disabled"
            :background="background" -->
          <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const choosedOrder = ref(0);

const changeOrder = (order: number) => {
  choosedOrder.value = order;
};
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
  }
}
</style>
