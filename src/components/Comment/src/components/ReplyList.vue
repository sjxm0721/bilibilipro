<template>
  <div class="reply-list-container">
    <div class="avatar-small">
      <img :src="replyData.avatar" />
    </div>
    <div class="reply-content">
      <span class="user-name">{{ replyData.accountName }}</span>&nbsp;&nbsp;
      <span v-if="replyData.responseName">回复&nbsp;&nbsp;<span class="response-name">{{ replyData.responseName }}</span>&nbsp;&nbsp;&nbsp; </span>
      <span style="font-size: 1.1em"
        >
        {{ replyData.content }}
        </span
      >
      <div class="reply-info">
        {{ replyData.postTime }} &nbsp;&nbsp;&nbsp;
        <def-svg-icon svg-name="likeLight" svg-color="#9499a0"></def-svg-icon>
        {{ replyData.likeNum }} &nbsp;&nbsp;&nbsp;
        <def-svg-icon svg-name="unlikeLight" svg-color="#9499a0"></def-svg-icon>
        &nbsp;&nbsp;&nbsp; <span class="reply-button" @click="clickReplyButton(replyData.commentId,replyData.accountName)">回复</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentData } from '@/api/comment/type';
defineProps<{replyData:CommentData,clickReplyButton:Function}>()



</script>

<style scoped lang="scss">
.reply-list-container {
  margin: 10px 0;
  display: flex;
  .avatar-small {
    width: 40px;
    img {
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .reply-content {
    width: calc(100% - 40px);
    line-height: 1.8em;
    .user-name {
      cursor: pointer;
      font-size: 0.9em;
      font-weight: 500;
      color: #61666d;
      &:hover {
        color: #06aeec;
      }
    }
    .response-name{
      color:#008AC5;
      cursor: pointer;
    }
    .reply-info {
      color: #9499a0;
      .reply-button{
        cursor: pointer;
          &:hover{
            color:#06AEEC;
          }
      }
    }
  }
}
</style>
