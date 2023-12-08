<template>
  <MessageNav />
  <div class="message-container">
    <div class="message-box">
      <div class="left-nav">
        <div class="top-logo">
          <def-svg-icon svg-name="messageCenter"></def-svg-icon>
          消息中心
        </div>
        <div class="main-content">
          <ul>
            <li @click="changeNav(0)" :class="{ choosed: choosedNav === 0 }">
              回复我的 <span class="notify notify-number" v-show="messageStore.commentNotRead!==0">{{ messageStore.commentNotRead }}</span>
            </li>
            <li @click="changeNav(1)" :class="{ choosed: choosedNav === 1 }">
              @ 我的 
            </li>
            <li @click="changeNav(2)" :class="{ choosed: choosedNav === 2 }">
              收到的赞 <span class="notify notify-number" v-show="messageStore.likeNotRead!==0">{{ messageStore.likeNotRead }}</span> 
            </li>
            <li @click="changeNav(3)" :class="{ choosed: choosedNav === 3 }">
              系统通知
            </li>
            <li @click="changeNav(4)" :class="{ choosed: choosedNav === 4 }">
              我的消息
            </li>
          </ul>
        </div>
      </div>
      <div class="right-show">
        <div class="top-title">
          {{ title }}
        </div>
        <div class="center-message">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageNav from "./components/MessageNav.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { useMessageStore } from "@/stores/modules/message";

const messageStore = useMessageStore()
const route = useRoute();
const router = useRouter();
const uid = route.params.uid;
const choosedNav = ref<number>(0);


const messageList: string[] = [
  "messageResponse",
  "messageAt",
  "messageLike",
  "messageSys",
  "messageWhisper",
];

const titleList: string[] = [
  "回复我的",
  "@ 我的",
  "收到的赞",
  "系统通知",
  "我的消息"
]

const changeNav = (newNav: number) => {
  choosedNav.value = newNav;
  router.push({
    name: messageList[newNav],
    params: { uid },
  });
};

const pathChoose = (newPath: string) => {
  if (newPath.includes("/response")) choosedNav.value = 0;
  else if (newPath.includes("/at")) choosedNav.value = 1;
  else if (newPath.includes("/like")) choosedNav.value = 2;
  else if (newPath.includes("/system")) choosedNav.value = 3;
  else if (newPath.includes("/line")) choosedNav.value = 4;
};

watch(
  () => route.fullPath,
  (newFullPath: string) => {
    pathChoose(newFullPath);
  },
  { immediate: true }
);

const title = computed(()=>titleList[choosedNav.value])
</script>

<style scoped lang="scss">
.message-container {
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 70px);
  background: url("https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/messageBg.jpg") top/cover no-repeat fixed;
  margin: 70px auto 0;
  .message-box {
    width: 75%;
    height: calc(100vh - 70px);
    max-width: 1143px;
    display: flex;
    margin: 0 auto;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-align: stretch;
    align-items: stretch;
    background-color: rgba(236, 230, 230, 0.4);

    .left-nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 15%;
      background-color: rgba(255, 255, 255, 0.6);
      .top-logo {
        font-weight: bold;
        height: 60px;
        line-height: 60px;
      }
      .main-content {
        width: 100%;
        padding: 0 0 0 20px;
        ul {
          .choosed {
            color: #2faee3;
          }
          li {
            cursor: pointer;
            height: 50px;
            line-height: 50px;
            color: #6b757b;
            font-weight: 500;
            vertical-align: baseline;
            &:hover {
              color: #2faee3;
            }
            &::before {
              font-size: 8px;
              display: inline-block;
              width: 20px;
              content: "\25cf";
              transform: translateY(-3%);
            }
            .notify-number{
              background-color: #fb7299;
              line-height: 16px;
              height: 16px;
              font-size: 12px;
              border-radius: 10px;
              width: 28px;
            }
            .notify{
              display: inline-block;
              text-align: center;
              color: #fff;
              transition: width 200ms,height 200ms;
            }
          }
        }
      }
    }
    .right-show {
      width: 85%;
      height: 100%;
      .top-title {
        margin: 15px 15px 0;
        height: 42px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
        line-height: 42px;
        padding: 0 20px;
        font-size: 1.1em;
        color: #666;
      }
      .center-message {
        padding: 15px;
        height: calc(100vh - 42px);
      }
    }
  }
}
</style>
