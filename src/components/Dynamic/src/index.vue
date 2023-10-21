<template>
  <div class="dynamic-component">
    <div style="display: flex; font-size: 1em; justify-content: space-between;">
      <div class="avatar">
      <img :src="dynamicData.avatar" />
    </div>
    <div class="main-content">
      <div>
        <span class="user">{{ dynamicData.accountName }}</span>
      </div>
      <div class="publish-time">{{ dynamicData.postTime }}</div>
      <div class="dynamic-body">
        <div class="type-word">
          {{ dynamicData.text }}
        </div>
        <div class="type-video" v-if="dynamicData.videoId">
          <def-video-dynamic-item
            :videoId="dynamicData.videoId"
            :lastTime="dynamicData.lastTime"
            :poster="dynamicData.poster"
            :title="dynamicData.title"
            :videoBrief="dynamicData.videoBrief"
            :barrageNum="dynamicData.barrageNum"
            :clickNum="dynamicData.clickNum"
          ></def-video-dynamic-item>
        </div>
      </div>
      <div class="user-operation">
        <div class="operation">
          <def-svg-icon svg-name="forward" svg-color="#99A2AA"></def-svg-icon>
          <span>0</span>
        </div>
        <div class="operation" @click="clickComment">
          <def-svg-icon svg-name="comment" svg-color="#99A2AA"></def-svg-icon>
          <span>{{ dynamicData.commentNum }}</span>
        </div>
        <div class="operation">
          <def-svg-icon svg-name="likeLight" svg-color="#99A2AA"></def-svg-icon>
          <span>{{ dynamicData.likeNum }}</span>
        </div>
      </div>
    </div>
    </div>
    
    <div class="comment-body" v-if="showComment">
      <def-comment :dynamicId="dynamicData.dynamicId"></def-comment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { DynamicData } from "@/api/dynamic/type";
defineProps<{ dynamicData: DynamicData }>()

const showComment = ref<boolean>(false)
const clickComment = ()=>{
  if(showComment.value === true){
    showComment.value = false
  }
  else{
    showComment.value = true
  }
}
</script>

<style scoped lang="scss">
.dynamic-component {
  font-size: 1em;
  padding: 0 10px;
  .avatar {
    width: 8%;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .main-content {
    font-size: 1em;
    width: 86%;
    .user {
      cursor: pointer;
      font-size: 1.1em;
      line-height: 1.2em;
      color: #ff6699;
    }
    .publish-time {
      font-size: 0.9em;
      line-height: 1.2em;
      color: #99a2aa;
    }
    .dynamic-body {
      font-size: 1em;
      margin: 10px 0px;
      .type-word {
        line-height: 1.5em;
        margin-bottom: 15px;
        word-wrap: break-word; 
      }
      .type-video {
        font-size: 1em;
        border: 1px solid #e3e5e7;
        border-radius: 6px;
      }
    }
    .user-operation {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-around;
      font-size: 1em;
      margin-top: 20px;
      .operation {
        cursor: pointer;
        svg {
          margin-right: 5px;
        }
        span {
          color: #99a2aa;
        }
      }
    }
  }
  // .comment-body{
  // }
}
</style>
