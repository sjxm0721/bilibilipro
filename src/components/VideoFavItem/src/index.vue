<template>
  <div class="video-fav-item-content">
    <div class="top-image" @click="toVideo">
      <img :src="fav.videoPoster" />
      <div class="time-last">
        {{ lastTime }}
      </div>
    </div>
    <div class="bottom-info">
      <div class="info-title" @click="toVideo">
        {{ fav.videoTitle }}
      </div>
      <div class="info-num">
        收藏于&nbsp;：&nbsp;{{ fav.createTime }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FavList } from "@/api/fav/type";
import { timeConvert } from "@/utils/timeFormator";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { reqClickVideo } from "@/api/video";
import { useAccountStore } from "@/stores/modules/account";
import type { HistoryPostInfo } from "@/api/history/type";
import { useHistoryStore } from "@/stores/modules/history";

const accountStore = useAccountStore();
const props = defineProps<{ fav: FavList }>();
const router = useRouter();
const historyStore = useHistoryStore()

const lastTime = computed(() => {
  return timeConvert(props.fav?.lastTime as number);
});

const toVideo = async () => {
  await reqClickVideo(props.fav.videoId!);
  let historyPostInfo: HistoryPostInfo = {
    uid: accountStore.myInfo?.uid!,
    videoId: props.fav.videoId!,
  };
  historyStore.addHistoryPageList(historyPostInfo)
  router.push({
    name: "video",
    params: { videoId: "BV" + props.fav.videoId },
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
    }
  }
}
</style>
