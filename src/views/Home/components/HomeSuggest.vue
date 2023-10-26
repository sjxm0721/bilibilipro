<template>
  <div class="suggest-container">
    <div class="item" v-for="(item,index) in videoInSuggest" :key="index">
      <def-video-item
        :video="item"
      ></def-video-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqVideoInSuggest } from "@/api/video";
import type { Video } from "@/api/video/type";

const videoInSuggest = ref<Video[]>()

const getVideoInSuggest = async ()=>{
  const res = await reqVideoInSuggest()
  videoInSuggest.value = res.data
}

onMounted(()=>getVideoInSuggest())

</script>

<style lang="scss" scoped>
.suggest-container {
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;

  .item {
    display: flex;
    width: 48%;
    height: 48%;
    border-radius: 10px;
  }
}
</style>
