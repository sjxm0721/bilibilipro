<template>
  <div class="home-main-container">
    <div class="container-left">
      <div class="home-video">
        <div class="video-nav">
          <span class="label">我的视频</span>
          <span class="label-show-num">11</span>
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
      </div>
      <div class="home-favlist"></div>
      <div class="home-like">
        <div class="like-nav">
          <span class="label">最近点赞的视频</span>
          <span class="label-show-num">11</span>
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
      </div>
      <div class="home-coin">
        <div class="coin-nav">
          <span class="label">最近投币的视频</span>
          <span class="label-show-num">11</span>
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
      </div>
    </div>
    <div class="container-right">
        <div style="margin: 20px;">个人资料</div>
        <div class="personal-info">
            <div>UID&nbsp;11451411037</div>
            <div>生日&nbsp;07-21</div>
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
.home-main-container {
  display: flex;
  justify-content: space-between;
  .label {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #1296db;
    }
  }
  .label-show-num {
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 20%;
    height: 18px;
    background-color: #f6fafb;
    font-size: 12px;
    line-height: 18px;
    padding: 0 5px;
    margin-left: 10px;
  }
  .container-left {
    width: 66%;
    background-color: #fff;
    padding: 30px 15px;
    vertical-align: baseline;
    .video-body {
      max-height: 520px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: 23% 23% 23% 23%;
      grid-column-gap: 2%;
      overflow: hidden;
      border-bottom: 1px solid rgba($color: #9499a0, $alpha: 0.3);
      .video {
        margin-bottom: 20px;
        font-size: 12px;
      }
    }
    .home-video {
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

    .home-favlist {
      margin-top: 30px;
      height: 200px;
      background-color: black;
    }
    .home-like {
      margin-top: 30px;
    }
    .home-coin{
        margin-top: 30px;
    }
  }
  .container-right {
    width: 33%;
    height: 150px;
    background-color: #fff;
    .personal-info{
        height: 80px;
        margin: 20px;
        border-top: 1px solid rgba($color: #9499a0, $alpha: 0.3);
        display: flex;
        align-items: center;
        >div{
            font-size: 12px;
            color:#6C757A;
            width: 50%;
        }
    }
  }
}
</style>
