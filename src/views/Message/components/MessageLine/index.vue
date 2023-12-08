<template> 
  <div class="line-container">
    <div class="left-list">
      <div
        class="title"
        style="padding-left: 30px; font-size: 0.9em; color: #666"
      >
        近期消息
      </div>
      <div
        class="list-box"
        :class="{active:userChosed === item.uid}"
        v-for="item in userList"
        :key="item.uid"
        @click="changeUser(item.uid, item.accountName)"
      >
        <div class="avatar">
          <img :src="item.avatar" />
        </div>
        <div
          style="font-weight: 400; font-family: Arial, Helvetica, sans-serif"
        >
          {{ item.accountName }}
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="title" style="justify-content: center">
        {{ userChosed===-1?"":userChosedName }}
      </div>
      <div class="message-area" v-if="userChosed !== -1&&userList">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/modules/account";
import { onMounted, ref, watch,provide } from "vue";
import { reqGetUserList } from "@/api/message/index";
import type { AccountInfoData } from "@/api/account/type";
import { useRouter, useRoute } from "vue-router";
import { reqGetAccountInfoById } from "@/api/account";

const route = useRoute();
const router = useRouter();
const accountStore = useAccountStore();
const account = accountStore.myInfo;

const userList = ref<AccountInfoData[]>([]);
const userChosed = ref<number>(-1);
const userChosedName = ref<string>("");

const accountOther = ref<AccountInfoData>();
const getAccountInfoById = async (uid: number) => {
  const res = await reqGetAccountInfoById(uid);
  accountOther.value = res.data;
};

const buildList = ()=>{
  if (route.query.mid == null) {
    userChosed.value = userList.value[0].uid;
    userChosedName.value = userList.value[0].accountName;
  } else {
    userChosed.value = parseInt(route.query.mid as string);
    const userToMove = userList.value.find(
      (user) => user.uid === userChosed.value
    );
    if(userToMove){
      userChosedName.value = userToMove.accountName
    }
    else {
      getAccountInfoById(userChosed.value).then(() => {
        userList.value = [accountOther.value!, ...userList.value];
        userChosedName.value = accountOther.value!.accountName
      });
    }
  }
}

watch(()=>route.query.mid,()=>{
  buildList()
})

const getUserList = async () => {
  const res = await reqGetUserList(account!.uid);
  userList.value = res.data;
  buildList()
};

//获取左侧最近聊天列表
onMounted(() => {
  getUserList()
  .then(()=>{
    router.push({
    name: "messageWhisper",
    params: { uid: account?.uid },
    query: { mid: userChosed.value },
  });
  })
});

//更改聊天对象
const changeUser = (uid: number, name: string) => {
  userChosed.value = uid;
  userChosedName.value = name;
  router.push({
    name: "messageWhisper",
    params: { uid: account?.uid },
    query: { mid: userChosed.value },
  });
};
provide('changeUser',changeUser)
</script>

<style lang="scss" scoped>
:deep() .el-textarea__inner {
  box-shadow: none;
  background-color: #f4f5f7;
}
:deep() .el-textarea .el-input__count {
  background-color: #f4f5f7;
}
.line-container {
  width: 100%;
  border-radius: 5px;
  display: flex;
  height: 88%;
  background-color: #fff;
  overflow: hidden;
  .left-list {
    width: 28%;
    .active{
      background-color: #E4E5E6;
    }
    .list-box {
      height: 80px;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 30px;
      .avatar {
        margin-right: 15px;
        & > img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      &:hover {
        background-color: #e4e5e6;
      }
    }
  }
  .right-box {
    width: 72%;
    border-left: 1px solid #e9eaec;
    background-color: #f4f5f7;
    position: relative;
    .message-area {
      height: calc(100% - 200px);
      overflow: auto;
    }
  }
  .title {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #e9eaec;
  }
}
</style>
