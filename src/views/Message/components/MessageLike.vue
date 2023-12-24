<template>
    <div
      class="message-like-container"
      v-if="messageStore.likeMessages.length > 0"
    >
      <ul>
        <li v-for="(item, index) in messageStore.likeMessages" :key="index">
          <div class="avatar" @click="toMember(item.fromUid!)">
            <img :src="item.fromAvatar" />
          </div>
          <div class="like-info">
            <div class="left">
              <div class="line-1">
                <span class="from-user" @click="toMember(item.fromUid!)">{{
                  item.fromName
                }}</span>
                &nbsp;
                <span class="like-brief">赞了我的{{ likeItemInfo(item) }}</span>
              </div>
              <div class="line-2">
                {{ formatPostTime(item.postTime!) }}
              </div>
            </div>
            <div class="right" v-if="item.commentId !== undefined">
              {{ item.commentContent }}
            </div>
            <div class="right" v-else-if="item.dynamicId !== undefined">
              {{ item.dynamicText }}
            </div>
            <div
              v-else-if="item.videoId !== undefined"
              style="
                width: 60px;
                height: 60px;
                border-radius: 2px;
                overflow: hidden;
              "
            >
              <img
                style="height: 100%; width: 100%; object-fit: cover"
                :src="item.videoPoster"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="like-nothing-container" v-else>
      <div class="nothing">
        <img
          src="https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/empty.jpg"
        />
      </div>
    </div>
</template>

<script setup lang="ts">
import { useMessageStore } from "@/stores/modules/message";
import type { message } from "@/utils/websocketClass";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const messageStore = useMessageStore();

const likeItemInfo = (likeMessage: message) => {
  if (likeMessage.videoId !== undefined) {
    return "视频";
  } else if (likeMessage.barrageId !== undefined) {
    return "弹幕";
  } else if (likeMessage.commentId !== undefined) {
    return "评论";
  } else if (likeMessage.dynamicId !== undefined) {
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
const toMember = (uid: number) => {
  router.push({
    name: "memberHome",
    params: { uid },
  });
};

onMounted(() => {
  messageStore.setLikeMessageRead();
});
</script>

<style lang="scss" scoped>
.message-like-container {
  height: calc(100% - 85px);
  background-color: #fff;
  border-radius: 4px;
  ul {
    overflow: auto;
    height: 100%;
    li {
      padding: 24px 20px;
      display: flex;
      .avatar {
        cursor: pointer;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .like-info {
        width: calc(100% - 61px);
        display: flex;
        justify-content: space-between;
        padding-bottom: 15px;
        border-bottom: 1px solid #e3e9ef;
        .left {
          width: calc(100% - 80px);
          .line-1 {
            max-height: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            margin-bottom: 15px;
            .from-user {
              font-weight: 700;
              cursor: pointer;
              &:hover {
                color: #00aeec;
              }
            }
            .like-brief {
              color: #505050;
            }
          }
          .line-2 {
            display: flex;
            align-items: center;
            font-size: 12px;
            line-height: 22px;
            color: #999;
          }
        }
        .right {
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
