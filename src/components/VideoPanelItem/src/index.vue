<template>
  <div class="video-panel-item-content">
    <div class="left-image" @click="toVideo">
      <img src="@/assets/images/lian.jpg" />
      <img :src="itemPicture">
      <div class="time-last">
        <!-- {{ videoTime }} -->
        07:21
      </div>
    </div>
    <div class="right-info">
      <div class="info-title" @click="toVideo">
        <!-- {{title}} -->
        抖s女王莲，没有她就弄不出来
      </div>
      <div class="info-author" @mouseover="changeSvgColor" @mouseleave="svgColorReturn">
        <def-svg-icon svg-name="up" :svg-color="svgColor"></def-svg-icon>
        <!-- {{ author}} -->
        不知出远子
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
  author: String,
});

const toVideo=()=>{
    router.push("/video/BV1")
}
</script>

<style scoped lang="scss">
.video-panel-item-content {
  display: flex;
  justify-content: space-between;
  .left-image {
    cursor: pointer;
    border-radius: 3%;
    overflow: hidden;
    position: relative;
    width: 40%;
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
    width: 56%;
    .info-title {
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
        margin:2% 0;
        display: inline-block;
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
