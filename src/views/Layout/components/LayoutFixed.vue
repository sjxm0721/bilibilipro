<template>
  <div
    class="nav-container"
    :class="[
      { show: y > 50 || routePath !== '/' },
      { fixed: y > 50 || routePath === '/' },
    ]"
  >
    <div class="col-left">
      <div class="nav-list" @click="toHome">
        <a>
          <def-svg-icon
            svg-name="bilibili"
            svg-width="60px"
            svg-height="25px"
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
    <div class="search-container" :style="{ visibility: searchHidden() }">
      <input type="text" placeholder="请输入搜索内容" v-model="input" @keyup.enter="toSearch"/>
      <div class="search-icon" @click="toSearch">
        <def-svg-icon svg-name="search"></def-svg-icon>
      </div>
    </div>
    <div class="avatar">
      <div v-if="accountStore.myInfo?.uid">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="accountStore.myInfo?.avatar" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toMember">个人空间</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item divided @click="accountStore.logout"
                >退出登陆</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-else @click="accountStore.showLogin" class="to-login">
        <span>登陆</span>
      </div>
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
      <div class="nav-list nav-list-right" @click="toMessage">
        <el-dropdown>
            <span class="el-dropdown-link">
              <div class="shake-icon">
                <def-svg-icon
                  svg-name="message"
                  svg-width="20px"
                  svg-height="20px"
                  svg-color="#000"
                ></def-svg-icon
                ><a style="color:black;">消息</a>
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="count in 5" @click="changeNav(count-1)">{{ titleList[count-1] }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
      </div>
      <div class="nav-list nav-list-right" @click="toDynamic">
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
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="shake-icon">
              <def-svg-icon
                svg-name="collection"
                svg-width="20px"
                svg-height="20px"
                svg-color="#000000"
              ></def-svg-icon
              ><a style="color: #000">收藏</a>
            </div>
          </span>
          <template #dropdown>
              <el-dropdown-menu
                style="max-height: 344px; overflow: auto"
                v-if="favStore.historeFavInfo.length>0"
              >
                <el-dropdown-item
                  v-for="item in favStore.historeFavInfo"
                  :key="item.favId"
                  style="white-space: normal !important;cursor: auto !important;"
                >
                  <div style="padding: 5px; width: 300px">
                    <def-video-nav-item :favList="item"></def-video-nav-item>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu
                v-else
                style="width: 180px;height: 180px;overflow: hidden;"
              >
                  <div>
                    <img src="@/assets/images/empty.jpg" style="width: 100%;height: 100%;object-fit: cover;">
                  </div>
              </el-dropdown-menu>
            </template>
        </el-dropdown>
      </div>
      <div class="nav-list nav-list-right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="shake-icon">
              <def-svg-icon
                svg-name="history"
                svg-width="20px"
                svg-height="20px"
                svg-color="#000000"
              ></def-svg-icon
              ><a style="color: #000">历史</a>
            </div>
          </span>
          <template #dropdown>
              <el-dropdown-menu
                style="max-height: 344px; overflow: auto"
                v-if="historyStore.historyPageList.length > 0"
              >
                <el-dropdown-item
                  v-for="item in historyStore.historyPageList"
                  :key="item.historyId"
                  style="
                    white-space: normal !important;
                    cursor: auto !important;
                  "
                >
                <div style="padding: 5px; width: 300px">
                  <def-video-history-item
                    :historyInfo="item"
                  ></def-video-history-item>
                </div>
                </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu
                v-else
                style="width: 180px; height: 180px; overflow: hidden"
              >
                <div>
                  <img
                    src="@/assets/images/empty.jpg"
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                </div>
              </el-dropdown-menu>
            </template>
        </el-dropdown>
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
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useScroll } from "@vueuse/core";
import { ref } from "vue";
import { useAccountStore } from "@/stores/modules/account";
import { useFavStore } from "@/stores/modules/fav";
import { useHistoryStore } from "@/stores/modules/history";
const { y } = useScroll(window);
const routePath = ref(useRoute().fullPath);
const router = useRouter();
const accountStore = useAccountStore();
const favStore = useFavStore()
const historyStore = useHistoryStore()
const input = ref<string>('')

const toHome = () => {
  router.push("/");
};

const toMember = () => {
  router.push({
    name: "memberHome",
    params: { uid: accountStore.myInfo?.uid },
  });
};

const toMessage = () => {
  router.push({
    name: "messageResponse",
    params: { uid: accountStore.myInfo?.uid },
  });
};

const toDynamic = () => {
  router.push({
    name: "dynamic",
    params: { uid: accountStore.myInfo?.uid },
  });
};

const toSearch = () => {
  router.push({
    name:'search',
    query:{keyword:input.value}
  });
};


const searchHidden = () => {
  if (useRoute().fullPath.includes("/search")) return "hidden";
  else return "visible";
};

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
  router.push({
    name: messageList[newNav],
    params: { uid:accountStore.myInfo?.uid },
  });
};
</script>

<style scoped lang="scss">
:deep() .el-dropdown-menu__item:hover {
  background-color: #eee !important;
}
.nav-container {
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid rgba($color: #9499a0, $alpha: 0.3);
  width: 100%;
  min-width: 1240px;
  max-width: 1440px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

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
    justify-content: space-around;
    // width: 40%;
    width: 500px;
    svg {
      transform: translate(-20%, -10%);
    }
  }
  .col-right {
    display: flex;
    width: 300px;
    justify-content: space-around;
  }
  .nav-list {
    cursor: pointer;
    color: #000;
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
    // flex-shrink: 0;
    margin-left: 15px;

    img {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border: #fff 2px solid;
      border-radius: 50%;
    }

    .to-login {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #06aeec;
      text-align: center;
      cursor: pointer;
      > span {
        line-height: 40px;
        color: #fff;
        font-weight: bold;
      }
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
