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
            <li @click="changeNav(0)" :class="{choosed:choosedNav===0}">回复我的</li>
            <li @click="changeNav(1)" :class="{choosed:choosedNav===1}">@ 我的</li>
            <li @click="changeNav(2)" :class="{choosed:choosedNav===2}">收到的赞</li>
            <li @click="changeNav(3)" :class="{choosed:choosedNav===3}">系统通知</li>
            <li @click="changeNav(4)" :class="{choosed:choosedNav===4}">我的消息</li>
          </ul>
        </div>
      </div>
      <div class="right-show">
        <div class="top-title">
            {{ title() }}
        </div>
        <div class="center-message">
            <div>

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageNav from "./components/MessageNav.vue";

import { ref } from "vue";

const choosedNav = ref(0)

const changeNav = (newNav:number)=>{
    choosedNav.value = newNav
}

const title = ()=>{
    if(choosedNav.value === 1) return '@ 我的'
    else if(choosedNav.value === 2) return '收到的赞'
    else if(choosedNav.value === 3) return '系统通知'
    else if(choosedNav.value === 4) return '我的消息'
    else return '回复我的'
}

</script>

<style scoped lang="scss">
.message-container {
  width: 100%;
  height: calc(100vh - 70px);
  background: url("@/assets/images/messageBg.jpg") top/cover no-repeat fixed;
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
      .main-content{
        ul{
            .choosed{
                color:#2FAEE3;
            }
            li{
                cursor: pointer;
                height: 50px;
                line-height: 50px;
                color:#6B757B;
                font-weight: 500;
                vertical-align: baseline;
                &:hover{
                    color:#2FAEE3;
                }
                &::before{
                    font-size: 8px;
                    display: inline-block;
                    width: 20px;
                    content: "\25cf";
                    transform: translateY(-3%);
                }
            }
        }
      }
    }
    .right-show {
      width: 85%;
      .top-title{
        margin: 15px 15px 0;
        height: 42px;
        background-color: #fff;
        border-radius:4px;
        box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
        line-height: 42px;
        padding: 0 20px;
        font-size: 1.1em;
        color:#666;
      }
      .center-message{

      }
    }
  }
}
</style>
