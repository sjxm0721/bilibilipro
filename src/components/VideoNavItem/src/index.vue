<template>
    <div class="video-nav-item-content">
      <div class="left-image" @click="toVideo">
        <img :src="favList.videoPoster" />
        <div class="time-last">
          {{ timeConvert(favList.lastTime!) }}          
        </div>
      </div>
      <div class="right-info">
        <div class="info-title" @click="toVideo">
          {{ favList.videoTitle }}
        </div>
        <div class="info-author" @mouseover="changeSvgColor" @mouseleave="svgColorReturn" @click="toMember">
          <def-svg-icon svg-name="up" :svg-color="svgColor" svg-width="1.2em"></def-svg-icon>
          {{ favList.videoUName }}
        </div>
        <div class="info-source">
            来自: {{ favList.fatherDicTitle }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FavList } from "@/api/fav/type";
import { ref } from "vue";
  import { useRouter } from 'vue-router';
  import { timeConvert } from "@/utils/timeFormator";
  import { reqClickVideo } from "@/api/video";
  import { useAccountStore } from "@/stores/modules/account";
  import type { HistoryPostInfo } from "@/api/history/type";
  import { useHistoryStore } from "@/stores/modules/history";


  const historyStore = useHistoryStore()

  const props = defineProps<{favList:FavList}>()
  
  const svgColor: any = ref("#9499A0");

  const router=useRouter()

  const accountStore = useAccountStore()

  const changeSvgColor = () => {
    svgColor.value = "#05AAE6";
  };
  
  const svgColorReturn = () => {
      svgColor.value = "#9499A0";
  };
  
  const toVideo=async ()=>{
      await reqClickVideo(props.favList.videoId!)
      let historyPostInfo:HistoryPostInfo = {
        uid:accountStore.myInfo?.uid!,
        videoId:props.favList.videoId!
      }
      historyStore.addHistoryPageList(historyPostInfo)
      router.push({
        name:'video',
        params:{videoId:'BV'+props.favList.videoId}
      })
  }

  //前往用户页面
  const toMember = () =>{
  router.push({
    name: "memberHome",
    params: { uid: props.favList.uid },
  });
}


  </script>
  
  <style scoped lang="scss">
  .video-nav-item-content {
    display: flex;
    justify-content: space-between;
    .left-image {
      cursor: pointer;
      border-radius: 3%;
      overflow: hidden;
      position: relative;
      width: 36%;
      height:calc(3.2em + 18px);
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .time-last {
        display: inline-block;
        padding: 2%;
        border-radius: 10%;
        color:#fff;
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
      .info-title {
        height:2.2em;
        cursor: pointer;
        font-size: 1em;
        line-height: 1.1em;
        overflow: hidden !important;
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
        line-height:1em;
        display: inline-block;
        cursor: pointer;
        color: #9499A0;
        font-size:0.8em;
        &:hover {
          color: #05AAE6;
        }
      }
      .info-source{
        line-height:1em;
        font-size:0.8em;
        color:#9499A0;
      }
    }
  }
  </style>
  