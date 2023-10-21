<template>
  <div class="video-fav-item-content">
    <div class="top-image" @click="toVideo">
      <img src="@/assets/images/tk.jpg" />
      <div class="time-last">
        11:20
      </div>
    </div>
    <div class="bottom-info">
      <div class="info-title" @click="toVideo">
        远子大小姐想向我告白
      </div>
      <div class="info-num">
        收藏于&nbsp;：&nbsp;&nbsp;&nbsp;2021-10-21
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VideoBox } from "@/api/video/type";
import { timeConvert } from "@/utils/timeFormator";
import { useRouter } from "vue-router";
import { computed } from "vue";

const props = defineProps<{ videoBox: VideoBox }>();
const router = useRouter();

const lastTime = computed(() => {
  return timeConvert(props.videoBox?.lastTime);
});

const postTime = computed(() => {
  return props.videoBox?.postTime.split(" ")[0];
});

const toVideo = () => {
  router.push({
    name: "video",
    params: { videoId: "BV" + props.videoBox.videoId },
  });
};
</script>

<style scoped lang="scss">
.video-fav-item-content {
  height: 100%;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .top-image {
    cursor: pointer;
    height: 60%;
    border-radius: 3%;
    overflow: hidden;
    position: relative;
    img {
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
  .bottom-info {
    font-size: 1em;
    .info-title {
      cursor: pointer;
      height: 3em;
      font-size: 1.1em;
      line-height: 1.5em;
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
    .info-num {
      font-size: 1em;
      color: #9499a0;
      .info-num-left,
      .info-num-right {
        font-size: 1em;
        line-height: 1.5em;
        display: inline-block;
        width: 50%;
      }
      svg {
        margin: 2%;
        font-size: 1em;
      }
    }
  }
}
</style>
