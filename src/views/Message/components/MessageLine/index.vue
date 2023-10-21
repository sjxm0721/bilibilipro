<template>
  <div class="line-container">
    <div class="left-list">
      <div
        class="title"
        style="padding-left: 30px; font-size: 0.9em; color: #666"
      >
        近期消息
      </div>
      <div class="list-box" v-for="item in userList" :key="item.uid" @click="changeUser(item.uid)">
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
      <div class="title" style="justify-content: center">{{ userChosed?.accountName }}</div>
      <div class="message-area" v-if="userChosed">
        <MessageBox :key="`${account!.uid}-${userChosed!.uid}`"  :fromUid="account!.uid" :toUid="userChosed!.uid"></MessageBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageBox from './components/MessageBox.vue';
import { useAccountStore } from '@/stores/modules/account';
import {reqGetUserList} from '@/api/message/index'
import { onMounted, ref } from 'vue';
import type { AccountInfoData } from '@/api/account/type';

const accountStore = useAccountStore()
const account = accountStore.myInfo

//获取左侧最近聊天列表
const userList = ref<AccountInfoData[]>([])
const userChosed = ref<AccountInfoData>()
const getUserList = async()=>{
  const res = await reqGetUserList(account!.uid)
  userList.value = res.data
  userChosed.value = userList.value[0]||[]
}
onMounted(()=>{
  getUserList()
})

const changeUser = (uid:number)=>{
  userChosed.value = userList.value.filter(item=>item.uid===uid)[0]
}


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
    height: 6%;
    background-color: #fff;
    border-bottom: 1px solid #e9eaec;
  }
}
</style>
