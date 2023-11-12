import { defineStore } from "pinia";
import { AccountInfoData } from "@/api/account/type";
import { ref } from "vue";
import { reqMyInfo } from "@/api/account";
import { getToken, removeToken } from "@/utils/auth";
import { useWebSocketStore } from "./websocket";
import router from "@/router";
import type { FavPage } from "@/api/fav/type";
import { useFavStore } from "./fav";
import { useHistoryStore } from "./history";
import type { HistoryPageInfo } from "@/api/history/type";
import { useLikeStore } from "./like";
import { useMessageStore } from "./message";

export const useAccountStore = defineStore(
  "account",
  () => {
    const myInfo = ref<AccountInfoData | null>(null);
    const loginBox = ref<boolean>(false);
    const websocketStore = useWebSocketStore();
    const favStore = useFavStore();
    const historyStore = useHistoryStore();
    const likeStore = useLikeStore();
    const messageStore = useMessageStore();
    const showLogin = () => {
      loginBox.value = true;
    };
    const hideLogin = () => {
      loginBox.value = false;
    };
    const getMyInfo = async () => {
      const token = getToken();
      if (token === undefined) {
        logout();
      } else {
        const res = await reqMyInfo(token!);
        myInfo.value = res.data;
      }
    };
    const getInfo = async () => {
      getMyInfo().then(() => {
        //获取聊天信息
        websocketStore.initializeWebSocket()
        //获取收藏夹历史
        const favPage: FavPage = {
          uid: myInfo.value!.uid,
          page: 1,
          pageSize: 10,
        };
        favStore.getHistoreFavInfo(favPage);
        favStore.getFatherFavList();
        favStore.getTotalFavVideo();
        //获取历史记录
        const historyPageInfo: HistoryPageInfo = {
          page: 1,
          pageSize: 10,
          uid: myInfo.value!.uid,
        };
        historyStore.getHistoryPageInfo(historyPageInfo);
        //获取点赞相关信息
        likeStore.getLikeList(myInfo.value!.uid, "0");
        likeStore.getLikeList(myInfo.value!.uid, "1");
        likeStore.getLikeList(myInfo.value!.uid, "2");
        likeStore.getLikeList(myInfo.value!.uid, "3");
        setTimeout(()=>{
          messageStore.getHistoryLikeList()
        },100)
      });
    };
    const clearMyInfo = () => {
      myInfo.value = null;
    };

    const logout = () => {
      clearMyInfo();
      removeToken();
      messageStore.clearLikeMessages();
      websocketStore.closeWebSocket();
      favStore.clearFavInfo();
      historyStore.clearHistoryPageInfo();
      likeStore.clearLikeList();
      router.push("/");
      showLogin();
    };
    return {
      myInfo,
      loginBox,
      getInfo,
      clearMyInfo,
      showLogin,
      hideLogin,
      logout,
      getMyInfo,
    };
  },
  {
    persist: true, //持久化配置
  }
);
