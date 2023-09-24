<template>
  <div
    class="nav-container"
    :class="[
      { show: y > 50 || routePath !== '/' },
      { fixed: y > 50 || routePath === '/' },
    ]"
  >
    <div class="col-left">
      <div class="nav-list">
        <a>
          <def-svg-icon
            svg-name="bilibili"
            svg-width="60px"
            svg-height="30px"
          ></def-svg-icon>
          <span>首页</span></a
        >
      </div>
      <div class="nav-list">
        <a class="shake">番剧</a>
      </div>
      <div class="nav-list">
        <a class="shake">直播</a>
      </div>
      <div class="nav-list">
        <a class="shake">游戏中心</a>
      </div>
      <div class="nav-list">
        <a class="shake">会员购</a>
      </div>
      <div class="nav-list">
        <a class="shake">漫画</a>
      </div>
      <div class="nav-list">
        <a class="shake">赛事</a>
      </div>
      <div class="nav-list">
        <def-svg-icon svg-name="download" svg-color="#000000"></def-svg-icon
        ><a>下载客户端</a>
      </div>
    </div>
    <div class="search-container">
      <input type="text" placeholder="请输入搜索内容" />
      <div class="search-icon">
        <def-svg-icon svg-name="search"></def-svg-icon>
      </div>
    </div>
    <div class="avatar">
      <img src="@/assets/images/avatar.jpg" />
    </div>
    <div class="col-right">
      <div class="nav-list nav-list-right">
        <div class="shake-icon">
          <def-svg-icon
            svg-name="member"
            svg-width="20px"
            svg-height="20px"
            svg-color="#000000"
          ></def-svg-icon
          ><a>大会员</a>
        </div>
      </div>
      <div class="nav-list nav-list-right">
        <div class="shake-icon">
          <def-svg-icon
            svg-name="message"
            svg-width="20px"
            svg-height="20px"
            svg-color="#000000"
          ></def-svg-icon
          ><a>消息</a>
        </div>
      </div>
      <div class="nav-list nav-list-right">
        <div class="shake-icon">
          <def-svg-icon
            svg-name="dynamic"
            svg-width="20px"
            svg-height="20px"
            svg-color="#000000"
          ></def-svg-icon
          ><a>动态</a>
        </div>
      </div>
      <div class="nav-list nav-list-right">
        <div class="shake-icon">
          <def-svg-icon
            svg-name="collection"
            svg-width="20px"
            svg-height="20px"
            svg-color="#000000"
          ></def-svg-icon
          ><a>收藏</a>
        </div>
      </div>
      <div class="nav-list nav-list-right">
        <div class="shake-icon">
          <def-svg-icon
            svg-name="history"
            svg-width="20px"
            svg-height="20px"
            svg-color="#000000"
          ></def-svg-icon
          ><a>历史</a>
        </div>
      </div>
      <div class="nav-list nav-list-right">
        <div class="shake-icon">
          <def-svg-icon
            svg-name="idea"
            svg-width="20px"
            svg-height="20px"
            svg-color="#000000"
          ></def-svg-icon
          ><a>创作中心</a>
        </div>
      </div>
    </div>
    <div class="contribute-atc">
      <el-button type="primary"
        ><def-svg-icon
          svg-name="upload"
          svg-height="25px"
          svg-width="25px"
        ></def-svg-icon
        >投稿</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useScroll } from "@vueuse/core";
import { ref } from "vue";
const { y } = useScroll(window);
const routePath = ref(useRoute().fullPath);
console.log(routePath);
</script>

<style scoped lang="scss">
.nav-container {
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid rgba($color: #9499a0, $alpha: 0.3);

  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;

  //隐藏状态：往上平移自身高度+完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 显示状态：移除平移+不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  &.fixed {
    position: fixed;
    z-index: 999999;
    left: 0;
    top: 0;
  }

  .col-left {
    display: flex;
    align-items: baseline;
    flex-shrink: 0;
    svg {
      transform: translate(-20%, -10%);
    }
  }
  .col-right {
    display: flex;
    flex-shrink: 0;
  }
  .nav-list {
    cursor: pointer;
    color: #000;
    position: relative;
    margin: 0 8px;
    .shake {
      display: inline-block;
      &:hover {
        animation: animate 0.5s ease-in-out 1;
      }
    }
    .shake-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:hover {
        & svg {
          animation: animate 0.5s ease-in-out 1;
        }
      }
    }
    @keyframes animate {
      0%,
      50%,
      100% {
        transform: translateY(0);
      }
      20% {
        transform: translateY(-4px);
      }
    }
  }
  .search-container {
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    height: 42px;
    width: 250px;
    background-color: #dee8eb;
    border-radius: 8px;
    border: none;
    input {
      width: 80%;
      height: 80%;
      margin-left: 5px;
      padding: 8px;
      border: none;
      border-radius: 6px;
      background-color: #dee8eb;
      &:focus {
        background-color: #d3dde0;
      }
    }

    .search-icon {
      position: absolute;
      right: 8px;
      border-radius: 5px;
      padding: 8px;
      padding-right: 4px;
      &:hover {
        background-color: #d3dde0;
      }
    }

    &:hover {
      background-color: #fff;
    }
  }
  .avatar {
    flex-shrink: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: #fff 2px solid;
    border-radius: 50%;
    margin-left: 15px;

    img {
      border-radius: 50%;
    }
  }

  .nav-list-right {
    a {
      margin: 2px;
    }
  }
  .contribute-atc {
    margin: 5px;
  }
}
</style>