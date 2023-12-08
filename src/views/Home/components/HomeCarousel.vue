<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="(item,index) in images" :key="index">
      <div class="carousel-container" @click="toVideo(item.videoId)">
        <img :src="item.poster" />
        <div class="info">
          <span style="margin: 20px;font-size: 18px;color: #fff;">{{ item.title }}</span>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqClickVideo } from "@/api/video";
import type { HistoryPostInfo } from "@/api/history/type";
import { useAccountStore } from "@/stores/modules/account";
import { useHistoryStore } from "@/stores/modules/history";
import { useRouter } from "vue-router";

const router = useRouter()
const historyStore = useHistoryStore()
const accountStore = useAccountStore()
const images = ref([
  {
    poster:"https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/ao.jpg",
    title:"空门苍",
    videoId:14,
  },
  {
    poster:"https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/by.jpg",
    title:"鸣濑白羽",
    videoId:15,
  },
  {
    poster:"https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/mkm.jpg",
    title:"镜子阿姨，嘿嘿，我的镜子阿姨",
    videoId:14,
  },
  {
    poster:"https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/ou2.jpg",
    title:"久岛鸥",
    videoId:15,
  },
  {
    poster:"https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/wds.jpg",
    title:"䌷文德斯",
    videoId:14,
  }
]);

const toVideo = async (videoId:number) => {
  await reqClickVideo(videoId);
  let historyPostInfo: HistoryPostInfo = {
    uid: accountStore.myInfo?.uid!,
    videoId,
  };
  historyStore.addHistoryPageList(historyPostInfo);
  router.push({
    name: "video",
    params: { videoId: "BV" + videoId },
  });
};
</script>
<style scoped lang="scss">
:deep().el-carousel__container {
  height: 400px;
}

:deep().el-carousel__indicator--horizontal .el-carousel__button {
  width: 15px;
  height: 10px;
  background: #f2f2f2;
  border: 1px solid #ffffff;
  border-radius: 50px;
  opacity: 0.8;
  border: none !important;
}
:deep().el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 30px;
  height: 10px;
  background: #fff;
  border-radius: 40px;
  border: none !important;
  opacity: 1;
}
:deep().el-carousel__indicators--horizontal {
  position: relative;
  bottom: 30px;
  left: 52%;
}

:deep() .el-carousel__arrow--left{
  left: 80%;
}

:deep() .el-carousel__arrow{
  top:90%;
}

.el-carousel__item {
  .carousel-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    img {
      height: 100%;
      object-fit: cover; 
    }
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 999;
      height: 20%;
      width: 100%;
      background-color: rgba($color: #fff, $alpha: 0.2);
      padding-top: 25px;
    }
  }
}
</style>
