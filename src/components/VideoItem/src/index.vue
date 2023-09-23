<template>
  <div class="container">
    <div class="top-pic">
      <img :src="itemPicture" />
      <div class="video-attr">
        <def-svg-icon svg-name="clickNum"></def-svg-icon>
        {{ clickNum }}
      </div>
      <div class="video-attr">
        <def-svg-icon svg-name="barrageNum"></def-svg-icon>
        {{ barrageNum }}
    </div>
      <div class="video-attr">{{ videoTime }}</div>
      <div id="shadow"></div>
    </div>
    <div class="center-title">
        <a>
            {{ title }}
        </a>
    </div>
    <div class="bottom-info">
        <a class="author">
            {{ author }}
        </a>
        <a class="post-time">
            {{ postTime }}
        </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  itemPicture: String,
  clickNum: {
    type: Number,
    default: 0,
  },
  barrageNum: {
    type: Number,
    default: 0,
  },
  videoTime: String,
  title: String,
  author: String,
  postTime: String,
});
</script>

<style lang="scss" scoped>
.container {
  border-radius: 5px;
  overflow: hidden;
  .top-pic {
    height: 64%;
    width: 100%;
    position: relative;
    cursor: pointer;
    img {
      border-radius: 5px;
    }
    .video-attr {
      position: absolute;
      color: #fff;
      bottom: 3%;
      display: flex;
      align-items: center;
      z-index: 999;
      svg{
        margin-right: 5%;
      }
      &:nth-child(2) {
        left: 5%;
      }
      &:nth-child(3) {
        left: 30%;
      }
      &:nth-child(4) {
        right: 5%;
      }
    }

    &:hover{
        opacity: 0.5;
    }
    #shadow{
        height: 18%;
        width: 100%;
        opacity: 0.3;
        background-image: linear-gradient(to top,#000,#f0f0f0);
        position: absolute;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        bottom: 0;
      }
  }
  .center-title {
    height: 16%;
    line-height: 1.2em;
    font-weight:500;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    a{
        font-size: 1.2em;
        cursor: pointer;
        &:hover{
            color:#05AAE6;
        }
    }
}
  .bottom-info {
    display: flex;
    align-items: center;
    width: 100%;
    height: 12%;
    a{
        cursor: pointer;
        font-size: 1em;
        line-height: 1em;
        color: rgba($color: #707070, $alpha: 0.8);
        &:hover{
            color:#05AAE6;
        }
    }
    .author{
        margin-right: 10%;
    }
  }
}
</style>
