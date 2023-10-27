<template>
  <div class="video-dynamic-component">
    <div class="left-image" @click="toVideo">
      <img :src="poster"/>
      <div class="time-last">
        {{ timeConvert(lastTime) }}
      </div>
    </div>
    <div class="right-info">
      <div class="info-title" @click="toVideo">
        {{title}}
      </div>
      <div class="info-brief">
        {{ videoBrief }}
      </div>
      <div class="info-num">
        <span style="margin-right: 5%"
          ><def-svg-icon svg-name="clickNum" svg-color="#9499A0"></def-svg-icon>
          {{clickNum}}
        </span>
        <span
          ><def-svg-icon
            svg-name="barrageNum"
            svg-color="#9499A0"
          ></def-svg-icon>
          {{ barrageNum }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { timeConvert } from "@/utils/timeFormator";
import { reqClickVideo } from "@/api/video";
const router = useRouter();
const props = defineProps<{
  videoId:number,
  clickNum:number,
  barrageNum:number,
  poster:string,
  videoBrief:string,
  title:string,
  lastTime:number
}>()
const toVideo =async () => {
  await reqClickVideo(props.videoId)
  router.push({
    name:'video',
    params:{videoId:'BV'+props.videoId}
  });
};
</script>

<style scoped lang="scss">
.video-dynamic-component {
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  .left-image {
    font-size: 1em;
    cursor: pointer;
    border-radius: 3%;
    overflow: hidden;
    position: relative;
    width: 36%;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .time-last {
      display: inline-block;
      padding: 2%;
      border-radius: 10%;
      background-color: rgba($color: #444, $alpha: 0.3);
      position: absolute;
      right: 5%;
      bottom: 5%;
    }
    &:hover {
      opacity: 0.5;
    }
  }
  .right-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    padding: 10px;
    font-size: 1em;
    .info-title {
      height: 2.2em;
      cursor: pointer;
      font-size: 1.1em;
      line-height: 1.1em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      color: black;
      &:hover {
        color: #05aae6;
      }
    }
    .info-brief {
      height: 2em;
      font-size: 0.9em;
      line-height: 1em;
      color: #9499a0;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    .info-num {
      font-size: 1em;
      height: 20%;
      color: #9499a0;
      svg {
        margin-right: 2%;
      }
    }
  }
}
</style>
