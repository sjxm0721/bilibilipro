import { defineStore } from "pinia";
import { AccountInfoData } from "@/api/account/type";
import { ref } from "vue";
import { reqGetAccountInfoById } from "@/api/account";
import { FollowList, FollowPageInfo } from "@/api/follow/type";
import { reqGetFansPageList, reqGetFollowPageList } from "@/api/follow";

export const useMemberStore = defineStore("member", () => {
  const memberInfo = ref<AccountInfoData | null>(null);
  const fansTotal = ref<number>(0);
  const followTotal = ref<number>(0);
  const fansPageList = ref<FollowList[]>();
  const followPageList = ref<FollowList[]>();

  const initMemberInfo = ()=>{
    fansTotal.value =0
    followTotal.value = 0
    fansPageList.value =[]
    followPageList.value =[]
    memberInfo.value = null
  }

  const getFansPageList = async (pageInfo: FollowPageInfo) => {
    const res = await reqGetFansPageList(pageInfo);
    fansPageList.value = res.data.record;
    fansTotal.value = res.data.total;
  };

  const getFollowPageList = async (pageInfo:FollowPageInfo) => {
    const res = await reqGetFollowPageList(pageInfo);
    followPageList.value = res.data.record;
    followTotal.value = res.data.total;
  };

  const getMemberInfo = async (uid: number) => {
    const result = await reqGetAccountInfoById(uid);
    memberInfo.value = result.data;
    console.log("111", memberInfo.value);
  };

  const clearMemberInfo = () => {
    initMemberInfo()
  };

  return {
    getMemberInfo,
    clearMemberInfo,
    getFansPageList,
    getFollowPageList,
    followTotal,
    fansTotal,
    followPageList,
    fansPageList,
    memberInfo,
  };
});
