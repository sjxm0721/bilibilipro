<template>
  <div class="video-item-container">
    <div class="top-pic" @click="toVideo">
      <img :src="videoBox?.poster" />
      <div class="video-attr">
        <def-svg-icon
          svg-name="clickNum"
          svg-color="#ffffff"
          svg-height="1em"
          svg-width="1em"
        ></def-svg-icon>
        {{ videoBox?.clickNum }}
      </div>
      <div class="video-attr">
        <def-svg-icon
          svg-name="barrageNum"
          svg-color="#ffffff"
          svg-height="1em"
          svg-width="1em"
        ></def-svg-icon>
        {{ videoBox?.barrageNum }}
      </div>
      <div class="video-attr">
        {{ lastTime }}
      </div>
      <div id="shadow"></div>
    </div>
    <div class="center-title" @click="toVideo">
      <a>
        {{ videoBox?.title }}
      </a>
    </div>
    <div class="bottom-info">
      <a class="author">
        {{ videoBox?.accountName }}
      </a>
      <a class="post-time">
        {{ postTime }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter} from "vue-router";
import type { VideoBox } from "@/api/video/type";
import { computed } from "vue";
import {timeConvert} from '@/utils/timeFormator'
const router = useRouter();
const props = defineProps<{videoBox:VideoBox}>();

const toVideo = () => {
  router.push({
    name:'video',
    params:{videoId:'BV'+props.videoBox.videoId}
  });
}

const lastTime = computed(()=>{
  return timeConvert(props.videoBox?.lastTime)
}) 

const postTime =computed(()=>{
  return props.videoBox?.postTime.split(" ")[0]
})


</script>

<style lang="scss" scoped>
.video-item-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 3%;
  overflow: hidden;
  font-size: 1em;
  .top-pic {
    font-size: 1em;
    height: 64%;
    width: 100%;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3%;
    }
    .video-attr {
      position: absolute;
      color: #fff;
      bottom: 3%;
      display: flex;
      align-items: center;
      z-index: 999;
      font-size: 1em;
      svg {
        margin-right: 0.2em;
      }
      &:nth-child(2) {
        left: 5%;
      }
      &:nth-child(3) {
        left: 35%;
      }
      &:nth-child(4) {
        right: 5%;
      }
    }

    &:hover {
      opacity: 0.5;
    }
    #shadow {
      height: 18%;
      width: 100%;
      opacity: 0.3;
      background-image: linear-gradient(to top, #000, #f0f0f0);
      position: absolute;
      border-bottom-left-radius: 5%;
      border-bottom-right-radius: 5%;
      bottom: 0;
    }
  }
  .center-title {
    height: 3.4em;
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    font-size: 1em;
    line-height: 1.7em;
    a {
      font-size: 1.2em;
      cursor: pointer;
      &:hover {
        color: #05aae6;
      }
    }
  }
  .bottom-info {
    display: flex;
    align-items: center;
    width: 100%;
    height: 16%;
    font-size: 1em;
    a {
      font-size: 1em;
      line-height: 1em;
      color: rgba($color: #707070, $alpha: 0.8);
    }
    .author {
      cursor: pointer;
      width:60%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      margin-right: 5%;
      &:hover {
        color: #05aae6;
      }
    }
  }
}
</style>
