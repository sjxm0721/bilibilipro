import { defineStore } from "pinia";
import { useWebSocketStore } from "./websocket";
import type { message } from "@/utils/websocketClass";
import { useAccountStore } from "./account";
import { computed, ref } from "vue";
import { reqSetMessageRead } from "@/api/message";

export const useMessageStore = defineStore("message", () => {
  const websocketStore = useWebSocketStore();
  const likeMessages = ref<message[]>([]);
  const commentMessages = ref<message[]>([])
  const accountStore = useAccountStore();
  const addLikeMessage = (message:message)=>{
    likeMessages.value.unshift(message)
  };
  const addCommentMessage = (message:message)=>{
    commentMessages.value.unshift(message)
  }
  const commentNotRead = computed(()=>{
    return commentMessages.value.filter(item=>item.isRead === "0").length
  })
  const likeNotRead = computed(()=>{
    return likeMessages.value.filter(item=>item.isRead === "0").length
  })
  const getHistoryLikeList = () => {
    const likeMessage: message = {
      fromUid: accountStore.myInfo!.uid,
      type: "1",
      isAll: true,
      isSystem: "0",
    };
    websocketStore.sendMessage(JSON.stringify(likeMessage));
  };
  const getHistoryCommentList = ()=>{
    const commentMessage:message = {
      fromUid:accountStore.myInfo!.uid,
      type:"3",
      isAll:true,
      isSystem:"0"
    }
    websocketStore.sendMessage(JSON.stringify(commentMessage))
  }
  const getMessageList = ()=>{
      getHistoryLikeList()
      getHistoryCommentList()
  }
  const clearLikeMessages = () => {
    likeMessages.value = [];
  };
  const clearCommentMessages = ()=>{
    commentMessages.value = [];
  }
  const setLikeMessageRead = async () =>{
    const listTmp = likeMessages.value.map(item=>item.messageId!)||[]
    const res = await reqSetMessageRead(listTmp)
    if(res.code===200){
      clearLikeMessages()
      getHistoryLikeList()
    }
  }
  const setCommentMessageRead = async () =>{
    const listTmp = commentMessages.value.map(item=>item.messageId!)||[]
    const res = await reqSetMessageRead(listTmp)
    if(res.code === 200){
      clearCommentMessages()
      getHistoryCommentList()
    }
  }
  const clearMessages = ()=>{
    clearCommentMessages()
    clearLikeMessages()
  }
  return {
    likeMessages,
    likeNotRead,
    commentMessages,
    commentNotRead,
    getMessageList,
    addLikeMessage,
    clearMessages,
    setLikeMessageRead,
    setCommentMessageRead,
    addCommentMessage,
  };
},{
    persist:true
});
