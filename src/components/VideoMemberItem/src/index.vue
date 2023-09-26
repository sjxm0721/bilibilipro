<template>
    <div class="video-member-item-content">
      <div class="top-image" @click="toVideo">
        <img src="@/assets/images/lian.jpg" />
        <!-- <img :src="itemPicture"> -->
        <div class="time-last">
          <!-- {{ videoTime }} -->
          07:21
        </div>
      </div>
      <div class="bottom-info">
        <div class="info-title" @click="toVideo">
          <!-- {{title}} -->
          抖s女王莲，没有她就弄不出来
        </div>
        <div class="info-num">
          <span style="margin-right: 5%"
            ><def-svg-icon svg-name="clickNum" svg-color="#9499A0"></def-svg-icon
            >
              <!-- {{clickNum}} -->
            114514
            </span
          >
          <span
            ><def-svg-icon
              svg-name="barrageNum"
              svg-color="#9499A0"
            ></def-svg-icon
            >
            <!-- {{ barrageNum }} -->
            11037
            </span
          >
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from 'vue-router';
  
  const svgColor: any = ref("#9499A0");
  
  const changeSvgColor = () => {
    svgColor.value = "#05AAE6";
  };
  
  const svgColorReturn = () => {
      svgColor.value = "#9499A0";
  };
  
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
  });
  
  const toVideo=()=>{
      router.push("/video/BV1")
  }
  </script>
  
  <style scoped lang="scss">
  .video-member-item-content {
    font-size:1em;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .top-image {
      cursor: pointer;
      border-radius: 3%;
      overflow: hidden;
      position: relative;
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
    .bottom-info {
      font-size: 1em;
      .info-title {
        cursor: pointer;
        font-size: 1.1em;
        line-height: 1.5em;
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
      .info-num {
        font-size: 1em;
        color: #9499A0;
        svg{
          margin-right:2%
        }
      }
    }
  }
  </style>
  