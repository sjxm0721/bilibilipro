import { defineStore } from "pinia";
import { useWebSocketStore } from "./websocket";
import type { message } from "@/utils/websocketClass";
import { useAccountStore } from "./account";
import { ref } from "vue";

export const useMessageStore = defineStore("message", () => {
  const websocketStore = useWebSocketStore();
  const likeMessages = ref<message[]>([]);
  const accountStore = useAccountStore();
  const AddLikeMessage = (message:message)=>{
    likeMessages.value.unshift(message)
  };
  const getHistoryLikeList = () => {
    const likeMessage: message = {
      fromUid: accountStore.myInfo!.uid,
      type: "1",
      isAll: true,
      isSystem: "0",
    };
    websocketStore.sendMessage(JSON.stringify(likeMessage));
  };
  const clearLikeMessages = () => {
    likeMessages.value = [];
  };
  return {
    likeMessages,
    getHistoryLikeList,
    AddLikeMessage,
    clearLikeMessages,
  };
},{
    persist:true
});
