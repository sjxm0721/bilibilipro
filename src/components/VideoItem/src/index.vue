<template>
  <div class="container">
    <div class="top-pic" @click="toVideo">
      <!-- <img :src="itemPicture" /> -->
      <img src="@/assets/images/tk.jpg">
      <div class="video-attr">
        <def-svg-icon svg-name="clickNum" svg-color="#ffffff"></def-svg-icon>
        <!-- {{ clickNum }} -->
        114514
      </div>
      <div class="video-attr">
        <def-svg-icon svg-name="barrageNum" svg-color="#ffffff"></def-svg-icon>
        <!-- {{ barrageNum }} -->
        11037
    </div>
      <div class="video-attr">
        <!-- {{ videoTime }} -->
        111:29
      </div>
      <div id="shadow"></div>
    </div>
    <div class="center-title" @click="toVideo">
        <a>
            <!-- {{ title }} -->
          抖m远子大小姐XX视频意外流出
        </a>
    </div>
    <div class="bottom-info">
        <a class="author">
            <!-- {{ author }} -->
            不知出家的下流女仆
        </a>
        <a class="post-time">
            <!-- {{ postTime }} -->
            1922-2-22
        </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router=useRouter()
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

const toVideo=()=>{
    router.push("/video/BV1")
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

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
    width: 100%;
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
        font-size: 1em;
        line-height: 1em;
        color: rgba($color: #707070, $alpha: 0.8);
        
    }
    .author{
      cursor: pointer;
        margin-right: 10%;
        &:hover{
            color:#05AAE6;
        }
    }
  }
}
</style>