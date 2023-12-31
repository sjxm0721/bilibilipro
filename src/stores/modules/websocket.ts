import { defineStore } from "pinia";
import WebSocketClass from "@/utils/websocketClass";
import { useAccountStore } from "./account";
import { useMessageStore } from "./message";
import type { message } from "@/utils/websocketClass.ts";
import { ref } from "vue";

export const useWebSocketStore = defineStore("websocket", () => {
  const socket = ref<WebSocketClass | null>(null);
  const historyMessages = ref<{ [key: string]: message[] }>({});
  const timeList = ref<{[key:string]:boolean}>({})
  const messageStore = useMessageStore();
  const initializeWebSocket = () => {
    return new Promise((resolve, reject) => {
      const account = useAccountStore().myInfo;
      socket.value = new WebSocketClass(
        `ws://localhost:8080/websocket/${account?.uid}`,
        {
          heartbeatInterval: 30000,
          reconnectInterval: 5000,
          maxReconnectAttempts: 5,
        }
      );
      // 添加WebSocket事件监听
      socket.value.on("open", (event: Event) => {
        // 处理WebSocket连接已打开事件
        console.log("已经连接上ws服务器", event);
        resolve(event);
      });

      socket.value.on("message", (data: string) => {
        // 处理WebSocket消息事件
        const messageTmp: message = JSON.parse(data);
        const isSystem = messageTmp.isSystem;
        const type = messageTmp.type;
        if (isSystem === "1") {
          //系统消息
        } else {
          //普通消息
          if (type === "0") {
            const fromUid: number = messageTmp.fromUid!;
            const toUid: number = messageTmp.toUid!;
            const key =
              fromUid < toUid ? `${fromUid}-${toUid}` : `${toUid}-${fromUid}`;
            if (!historyMessages.value[key]) {
              historyMessages.value[key] = [];
            }
            const timeTmp = messageTmp.postTime!.slice(0,16)
            if(!timeList.value[timeTmp]){
              timeList.value[timeTmp]=true
              messageTmp.showTime = timeTmp
            }
            historyMessages.value[key].push(messageTmp);
          } else if (type === "1") {
            //点赞消息
            messageStore.addLikeMessage(messageTmp);
          } else if (type === "3") {
            //评论消息
            messageStore.addCommentMessage(messageTmp);
          }
        }
      });

      socket.value.on("error", (event: Event) => {
        // 处理WebSocket错误事件
        console.log("ws服务器错误", event);
        reject();
      });

      socket.value.on("close", (event: Event) => {
        // 处理WebSocket连接关闭事件
        console.log("ws连接已经关闭", event);
      });
    });
  };
  const closeWebSocket = () => {
    if (socket.value) {
      socket.value.close();
    }
  };

  const sendMessage = (data: string) => {
    if (socket.value) {
      socket.value.send(data);
    } else {
      console.log("WebSocket连接已经关闭", data);
    }
  };
  return {
    socket,
    historyMessages,
    timeList,
    initializeWebSocket,
    closeWebSocket,
    sendMessage,
  };
});
