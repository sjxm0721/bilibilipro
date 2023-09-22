<template>
  <nav class="nav-container" :class="{ show: y > 50 }">
    <el-row
      :gutter="5"
      justify="space-around"
      style="padding-top: 5px; display: flex; align-items: center"
    >
      <el-col
        :span="10"
        :xs="22"
        class="col-left"
        style="display: flex; align-items: baseline"
      >
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
          <def-svg-icon svg-name="download"></def-svg-icon><a>下载客户端</a>
        </div>
      </el-col>

      <el-col :span="5" :xs="0" class="center-search">
        <div class="search-container">
          <input type="text" placeholder="请输入搜索内容" />
          <div class="search-icon">
            <def-svg-icon svg-name="search"></def-svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="1" :xs="2">
        <div class="avatar">
          <img src="@/assets/images/avatar.jpg" />
        </div>
      </el-col>
      <el-col :span="6" :xs="0">
        <div class="col-right">
          <div class="nav-list nav-list-right">
            <div class="shake-icon">
              <def-svg-icon
                svg-name="member"
                svg-width="20px"
                svg-height="20px"
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
                svg-color="#000"
              ></def-svg-icon
              ><a>创作中心</a>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="2" :xs="0">
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
      </el-col>
    </el-row>
  </nav>
</template>

<script setup lang="ts">
import { useScroll } from "@vueuse/core";
const { y } = useScroll(window);
</script>

<style scoped lang="scss">
.nav-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999999;
  height: 70px;
  background-color: #fff;
  width: 100%;
  padding: 10px;

  //隐藏状态：往上平移自身高度+完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 显示状态：移除平移+不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .col-left {
    display: flex;
    justify-content: space-around;
    svg {
      transform: translate(-20%, -10%);
    }
  }
  .col-right {
    display: flex;
    justify-content: space-around;
  }
  .nav-list {
    cursor: pointer;
    color: #000;
    position: relative;
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
  .center-search {
    .search-container {
      position: relative;
      display: flex;
      align-items: center;
      height: 42px;
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
        right: 4px;
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
  }
  .avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: #fff 2px solid;
    border-radius: 50%;
    position: relative;
    left: 20%;

    img {
      width: 100%;
      height: 100%;
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
