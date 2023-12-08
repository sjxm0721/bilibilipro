<template>
  <div class="video-panel-item-content">
    <div class="left-image" @click="toVideo">
      <img :src="video.poster">
      <div class="time-last">
        {{ timeConvert(video.lastTime) }}
      </div>
    </div>
    <div class="right-info">
      <div class="info-title" @click="toVideo">
        {{ video.title }}
      </div>
      <div class="info-author" @mouseover="changeSvgColor" @mouseleave="svgColorReturn" @click="toMember">
        <def-svg-icon svg-name="up" :svg-color="svgColor"></def-svg-icon>
        {{ video.accountName }}
      </div>
      <div class="info-num">
        <span style="margin-right: 5%"
          ><def-svg-icon svg-name="clickNum" svg-color="#9499A0"></def-svg-icon
          >
            {{video.clickNum}}
          </span
        >
        <span
          ><def-svg-icon
            svg-name="barrageNum"
            svg-color="#9499A0"
          ></def-svg-icon
          >
          {{ video.barrageNum }}
          </span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type{ Video } from "@/api/video/type";
import { timeConvert } from "@/utils/timeFormator";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { reqClickVideo } from "@/api/video";
import type { HistoryPostInfo } from "@/api/history/type";
import { useAccountStore } from "@/stores/modules/account";
import { useHistoryStore } from "@/stores/modules/history";

const accountStore = useAccountStore()

const historyStore = useHistoryStore()

const svgColor: any = ref("#9499A0");

const changeSvgColor = () => {
  svgColor.value = "#05AAE6";
};

const svgColorReturn = () => {
    svgColor.value = "#9499A0";
};

const router=useRouter()

const props = defineProps<{video:Video}>()

const toVideo=async ()=>{
      await reqClickVideo(props.video.videoId!)
      let historyPostInfo:HistoryPostInfo = {
        uid:accountStore.myInfo?.uid!,
        videoId:props.video.videoId!
      }
      historyStore.addHistoryPageList(historyPostInfo)
      router.push({
        name:'video',
        params:{videoId:'BV'+props.video.videoId}
      })
  }

   //前往用户页面
  const toMember = () =>{
  router.push({
    name: "memberHome",
    params: { uid: props.video.uid },
  });
}

</script>

<style scoped lang="scss">
.video-panel-item-content {
  display: flex;
  justify-content: space-between;
  height:100%;
  .left-image {
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
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info-title {
      height:2.4em;
      cursor: pointer;
      font-size: 1.2em;
      line-height: 1.2em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      color: black;
      &:hover {
        color: #05AAE6;
      }
    }
    .info-author {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      word-break: break-word;
      -webkit-line-clamp: 1;
      cursor: pointer;
      color: #9499A0;
      &:hover {
        color: #05AAE6;
      }
    }
    .info-num {
      color: #9499A0;
      svg{
        margin-right:2%
      }
    }
  }
}
</style>
