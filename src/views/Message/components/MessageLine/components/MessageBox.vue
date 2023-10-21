<template>
  <div class="message-box-container">
    <div class="message-area">
      <div
        :class="{
          'message-box-right': item.fromUid === account?.uid,
          'message-box-left': item.toUid === account?.uid,
        }"
        v-for="item in historyMessages"
        :key="item.messageId"
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
import { onMounted, ref } from "vue";
import type { message } from "@/utils/websocketClass.ts";
import { useAccountStore } from "@/stores/modules/account";
import WebSocketClass from "@/utils/websocketClass.ts";
const props = defineProps<{ fromUid: number; toUid: number }>();
const websocketStore = useWebSocketStore();
const socket: WebSocketClass | null = useWebSocketStore().socket;
const accountStore = useAccountStore();
const account = accountStore.myInfo;
const messageInfo = ref<message>({
  isSystem: "0",
  fromUid: props.fromUid,
  toUid: props.toUid,
  content: "",
  type: "0",
  isAll: false,
});
const historyMessages = ref<message[]>([]);
onMounted(() => {
  const historyMessage: message = {
    fromUid: props.fromUid,
    toUid: props.toUid,
    isSystem: "0",
    isAll: true,
    type: "0",
  };

  //获取数据
  socket!.on("message", (data: string) => {
    // 处理WebSocket消息事件
    const messageTmp: message = JSON.parse(data);
    const isSystem = messageTmp.isSystem;
    const type = messageTmp.type;
    if (isSystem === "1") {
      //系统消息
    } else {
      //普通消息
      if (type === "0") {
        //聊天消息
        historyMessages.value.push(messageTmp);
      }
    }
  });
  websocketStore.sendMessage(JSON.stringify(historyMessage));
});

//发送私信
const sendPrivateMsg = () => {
  const msg: string = JSON.stringify(messageInfo.value);
  let msgMore = {
    fromName: account?.accountName,
    fromAvatar: account?.avatar,
  }
  const msgTmp = { ...messageInfo.value, ...msgMore }
  websocketStore.sendMessage(msg)
  historyMessages.value.push(msgTmp)
  messageInfo.value.content = ""
}
</script>

<style scoped lang="scss">
.message-box-container {
  .message-area {
    .message-box-left,
    .message-box-right {
      margin: 20px;
      .avatar {
        & > img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
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
