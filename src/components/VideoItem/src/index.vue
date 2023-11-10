<template>
  <div class="video-item-container">
    <div class="top-pic" @click="toVideo">
      <img :src="video?.poster" />
      <div class="video-attr">
        <def-svg-icon
          svg-name="clickNum"
          svg-color="#ffffff"
          svg-height="1em"
          svg-width="1em"
        ></def-svg-icon>
        {{ video?.clickNum }}
      </div>
      <div class="video-attr">
        <def-svg-icon
          svg-name="barrageNum"
          svg-color="#ffffff"
          svg-height="1em"
          svg-width="1em"
        ></def-svg-icon>
        {{ video?.barrageNum }}
      </div>
      <div class="video-attr">
        {{ lastTime }}
      </div>
      <div id="shadow"></div>
    </div>
    <a class="center-title" @click="toVideo">
      {{ video?.title }}
    </a>
    <div class="bottom-info">
      <a class="author">
        {{ video?.accountName }}
      </a>
      <a class="post-time">
        {{ postTime }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Video } from "@/api/video/type";
import { computed } from "vue";
import { timeConvert } from "@/utils/timeFormator";
import { reqClickVideo } from "@/api/video";
import type { HistoryPostInfo } from "@/api/history/type";
import { useAccountStore } from "@/stores/modules/account";
import { useHistoryStore } from "@/stores/modules/history";

const router = useRouter();
const props = defineProps<{ video: Video }>();
const accountStore = useAccountStore();
const historyStore = useHistoryStore();

const toVideo = async () => {
  await reqClickVideo(props.video.videoId);
  let historyPostInfo: HistoryPostInfo = {
    uid: accountStore.myInfo?.uid!,
    videoId: props.video.videoId!,
  };
  historyStore.addHistoryPageList(historyPostInfo);
  router.push({
    name: "video",
    params: { videoId: "BV" + props.video.videoId },
  });
};

const lastTime = computed(() => {
  return timeConvert(props.video?.lastTime);
});

const postTime = computed(() => {
  return props.video?.postTime.split(" ")[0];
});
</script>

<style lang="scss" scoped>
.video-item-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1em;
  height: 100%;
  .top-pic {
    font-size: 1em;
    height: 64%;
    width: 100%;
    position: relative;
    cursor: pointer;
    border-radius: 0.5em;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-attr {
      position: absolute;
      color: #fff;
      bottom: 4%;
      display: flex;
      align-items: center;
      z-index: 999;
      font-size: 1em;
      svg {
        margin-right: 0.3em;
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
    font-size: 1.2em;
    line-height: 1.7em;
    cursor: pointer;
    &:hover {
      color: #05aae6;
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
      width: 60%;
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
