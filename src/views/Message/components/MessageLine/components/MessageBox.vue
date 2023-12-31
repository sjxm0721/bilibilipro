<template>
  <div class="message-box-container">
    <div class="message-area">
      <div
        v-for="(item, index) in websocketStore.historyMessages[messageKey]"
        :key="index"
      >
        <div class="msg-time" v-show="item.showTime">
          <div>
            <span class="time">{{ formatPostTime(item.showTime!) }}</span>
          </div>
        </div>
        <div
          :class="{
            'message-box-right': item.fromUid === account?.uid,
            'message-box-left': item.toUid === account?.uid,
          }"
        >
          <div class="avatar">
            <img :src="item.fromAvatar" />
          </div>
          <div
            :class="{
              'content-right': item.fromUid === account?.uid,
              'content-left': item.toUid === account?.uid,
            }"
          >
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="message-post">
      <el-input
        v-model="messageInfo.content"
        maxlength="500"
        show-word-limit
        type="textarea"
        rows="5"
        resize="none"
      />
      <button class="post-button" @click="sendPrivateMsg">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebSocketStore } from "@/stores/modules/websocket";
import { onMounted, onUnmounted, ref } from "vue";
import type { message } from "@/utils/websocketClass.ts";
import { useAccountStore } from "@/stores/modules/account";
import { useRoute } from "vue-router";

const route = useRoute();
const websocketStore = useWebSocketStore();
const accountStore = useAccountStore();
const account = accountStore.myInfo;
const messageInfo = ref<message>({
  isSystem: "0",
  fromUid: account?.uid,
  toUid: parseInt(route.query.mid as string),
  content: "",
  type: "0",
  isAll: false,
});
const messageKey =
  account?.uid! < parseInt(route.query.mid as string)!
    ? `${account?.uid!}-${parseInt(route.query.mid as string)!}`
    : `${parseInt(route.query.mid as string)!}-${account?.uid!}`;

onMounted(() => {
  const historyMessage: message = {
    fromUid: account?.uid,
    toUid: parseInt(route.query.mid as string),
    isSystem: "0",
    isAll: true,
    type: "0"
  };
  websocketStore.sendMessage(JSON.stringify(historyMessage));
});

const sendPrivateMsg = () => {
  
  let msgMore = {
    fromName: account?.accountName,
    fromAvatar: account?.avatar,
  };
  const msgTmp: message = { ...messageInfo.value, ...msgMore };
  var currentDate = new Date();
  var formattedDate = currentDate
    .toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Shanghai",
    })
    .replace(/ /, "T").replace(/\//g, '-');
  const timeTmp = formattedDate.slice(0,16)
  msgTmp.postTime = formattedDate;
  const msg: string = JSON.stringify(messageInfo.value);
  websocketStore.sendMessage(msg);
  if (!websocketStore.historyMessages[messageKey]) {
    websocketStore.historyMessages[messageKey] = [];
  }
  if (!websocketStore.timeList[timeTmp]) {
    websocketStore.timeList[timeTmp] = true;
    msgTmp.showTime = timeTmp;
  }
  websocketStore.historyMessages[messageKey].push(msgTmp);
  messageInfo.value.content = "";
};

const formatPostTime = (time: string) => {
  return new Date(time).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onUnmounted(() => {
  websocketStore.historyMessages[messageKey] = [];
  websocketStore.timeList = {};
});
</script>

<style scoped lang="scss">
.message-box-container {
  .message-area {
    .msg-time {
      padding: 16px 0 0;
      text-align: center;
      .time {
        color: #999;
        font-size: 12px;
        line-height: 22px;
        margin: 0 10px;
      }
    }
    .message-box-left,
    .message-box-right {
      margin: 20px;
      .avatar {
        & > img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .content-left,
      .content-right {
        margin: 0 10px;
        padding: 15px;
        border-radius: 10px;
        background-color: #fff;
        max-width: 50%;
      }
      .content-left {
        border-top-left-radius: 0;
      }
      .content-right {
        border-top-right-radius: 0;
      }
    }

    .message-box-left {
      display: flex;
      flex-direction: row;
      border-top-left-radius: 0;
    }

    .message-box-right {
      display: flex;
      flex-direction: row-reverse;
      border-top-right-radius: 0;
    }
  }
  .message-post {
    background-color: #f4f5f7;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 160px;
    border-top: 1px solid #d8d8d8;
    .post-button {
      position: absolute;
      cursor: pointer;
      border-radius: 4px;
      bottom: 10px;
      right: 10px;
      height: 30px;
      width: 90px;
      background-color: #fff;
      border: 1px solid #e7e7e7;
    }
  }
}
</style>
