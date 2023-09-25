<template>
  <div style="position: relative;">
    <div class="nav-container">
      <div class="col-left">
        <div class="nav-list">
          <def-svg-icon svg-name="home" svg-color="#ffffff"></def-svg-icon
          ><a>首页</a>
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
          <def-svg-icon svg-name="download" svg-color="#ffffff"></def-svg-icon
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
              svg-color="#ffffff"
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
              svg-color="#ffffff"
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
              svg-color="#ffffff"
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
              svg-color="#ffffff"
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
              svg-color="#ffffff"
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
              svg-color="#ffffff"
            ></def-svg-icon
            ><a>创作中心</a>
          </div>
        </div>
      </div>
      <div class="contribute-atc">
        <el-button type="success"
          ><def-svg-icon
            svg-name="upload"
            svg-height="25px"
            svg-width="25px"
          ></def-svg-icon
          >投稿</el-button
        >
      </div>
    </div>
    <div class="banner-logo">
      <a href="javascript:;">
        <img src="@/assets/images/logo.jpg" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.banner-logo img {
  width: 160px;
  height: 80px;
  left: 42px;
  bottom: 8px;
  position: absolute;
  cursor: pointer;
}
.nav-container {
  height: 150px;
  padding: 15px;
  padding-top: 15px;
  background-image: url("@/assets/images/banner.jpg");
  background-size: cover;
  display: flex;
  justify-content: space-around;
  .col-left {
    display: flex;
    margin-top: 10px;
    width: 40%;
    height: 25px;
    justify-content: space-around;
    svg {
      transform: translate(-20%, -10%);
    }
  }
  .col-right {
    display: flex;
    width: 25%;
    height: 25px;
    justify-content: space-around;
  }
  .nav-list {
    cursor: pointer;
    color: #fff;
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
    position: relative;
    display: flex;
    align-items: center;
    width: 20%;
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
