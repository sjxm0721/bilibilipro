import { defineStore } from "pinia";
import WebSocketClass from "@/utils/websocketClass";
import { useAccountStore } from "./account";
import { ref } from "vue";

export const useWebSocketStore = defineStore("websocket", () => {
  const socket = ref<WebSocketClass | null>(null);
  const initializeWebSocket = () => {
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
    });


    socket.value.on("error", (event: Event) => {
      // 处理WebSocket错误事件
      console.log("ws服务器错误", event);
    });

    socket.value.on("close", (event: Event) => {
      // 处理WebSocket连接关闭事件
      console.log("ws连接已经关闭", event);
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
    initializeWebSocket,
    closeWebSocket,
    sendMessage,
  };
});
