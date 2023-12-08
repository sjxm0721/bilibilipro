<template>
  <div class="message-response-container" v-if="messageStore.commentMessages.length>0">
    <div class="response-box" v-for="(item) in messageStore.commentMessages" :key="item.messageId">
      <div class="response-item">
        <div class="left-avatar">
          <img @click="toMember(item.fromUid!)" :src="item.fromAvatar" />
        </div>
        <div class="center-info">
          <div class="info-top">
            <span class="info-name" @click="toMember(item.fromUid!)">{{ item.fromName }}</span>
            &nbsp;<span style="color: #505050">回复了我的{{ commentItemInfo(item) }}</span>
          </div>
          <div class="info-center">
            {{ item.content }}
          </div>
          <div class="info-bottom">{{ formatPostTime(item.postTime!) }}</div>
        </div>
        <div class="right-brief" v-if="item.commentId !== undefined">
            {{ item.commentContent }}
          </div>
          <div class="right-brief" v-else-if="item.dynamicId !== undefined">
            {{ item.dynamicText }}
          </div>
          <div v-else-if="item.videoId!==undefined" style="width: 60px; height: 60px; border-radius: 2px; overflow: hidden;">
            <img style="height: 100%; width: 100%; object-fit: cover;" :src="item.videoPoster" />
          </div>
      </div>
    </div>
  </div>
  <div class="like-nothing-container" v-else>
    <div class="nothing">
      <img src="https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/empty.jpg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/modules/message';
import type{message} from "@/utils/websocketClass"
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter()
const messageStore = useMessageStore()

const commentItemInfo = (commentMessage: message) => {
  if (commentMessage.videoId !== undefined) {
    return "视频";
  } else if (commentMessage.barrageId !== undefined) {
    return "弹幕";
  } else if (commentMessage.commentId !== undefined) {
    return "评论";
  } else if (commentMessage.dynamicId !== undefined) {
    return "动态";
  }
};

const formatPostTime = (time: string) => {
  return new Date(time).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

//前往用户页面
const toMember = (uid:number) => {
  router.push({
    name: "memberHome",
    params: { uid },
  });
};

onMounted(()=>{
  messageStore.setCommentMessageRead()
})
</script>

<style lang="scss" scoped>
.message-response-container {
    height: calc(100% - 85px);
    overflow: auto;
  .response-box {
    width: 100%;
    background-color: #fff;
    padding: 16px 24px;
    border-radius: 4px;
    margin-bottom: 10px;
    .response-item {
      display: flex;
      .left-avatar {
        width: 60px;
        height: 46px;
        img {
          height: 46px;
          width: 46px;
          border-radius: 50%;
          object-fit: cover;
          cursor: pointer;
        }
      }
      .center-info {
        width: calc(100% - 154px);
        .info-top {
          margin-bottom: 10px;
          line-height: 15px;
          .info-name {
            font-weight: 700;
            cursor: pointer;
            &:hover{
              color:#00AEEC;
            }
          }
        }
        .info-center {
          width: 100%;
          line-height: 18px;
          height: 20px;
          color: #222;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
          padding-right: 14px;
        }
        .info-bottom {
          color: #999;
          font-size: 12px;
          line-height: 22px;
        }
      }
      .right-brief {
        width: 80px;
        height: 60px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        line-height: 15px;
      }
    }
  }
}

.like-nothing-container {
  background-color: #fff;
  border-radius: 5px;
  .nothing {
    height: 256px;
    width: 100%;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
