<template>
  <div style="position: relative">
    <div class="nav-container">
      <div class="col-left">
        <div class="nav-list" @click="toHome">
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
      <div
        class="search-container"
        ref="refSearchSuggest"
        :class="{ 'search-focus': isSearchSuggestVisible === true }"
      >
        <input
          type="text"
          placeholder="请输入搜索内容"
          v-model="input"
          @focus="showSearchSuggest"
        />
        <!-- @keyup.enter="toSearch" -->
        <div class="search-icon" @click="toSearch(input)">
          <def-svg-icon svg-name="search"></def-svg-icon>
        </div>
        <div class="search-suggest" v-show="isSearchSuggestVisible && y < 50">
          <def-search :toSearch="toSearch"></def-search>
        </div>
      </div>
      <div class="avatar">
        <div v-if="accountStore.myInfo?.uid">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img
                :src="accountStore.myInfo?.avatar"
                v-if="accountStore.myInfo?.uid"
              />
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
              svg-color="#ffffff"
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
                  svg-color="#ffffff"
                ></def-svg-icon
                ><a style="color: #fff">消息</a>
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu style="width: 120px">
                <el-dropdown-item
                  v-for="count in 5"
                  @click="changeNav(count - 1)"
                  style="position: relative"
                  >{{ titleList[count - 1] }}
                  <span
                    class="notify-num"
                    style="position: absolute; right: 10px"
                    v-show="messageStore.likeNotRead !== 0 && count === 3"
                    >{{ messageStore.likeNotRead }}</span
                  >
                  <span
                    class="notify-num"
                    style="position: absolute; right: 10px"
                    v-show="messageStore.commentNotRead !== 0 && count === 1"
                    >{{ messageStore.commentNotRead }}</span
                  >
                </el-dropdown-item>
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
              svg-color="#ffffff"
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
                  svg-color="#ffffff"
                ></def-svg-icon
                ><a style="color: #fff">收藏</a>
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu
                style="max-height: 344px; overflow: auto"
                v-if="favStore.historeFavInfo.length > 0"
              >
                <el-dropdown-item
                  v-for="item in favStore.historeFavInfo"
                  :key="item.favId"
                  style="
                    white-space: normal !important;
                    cursor: auto !important;
                  "
                >
                  <div style="padding: 5px; width: 300px">
                    <def-video-nav-item :favList="item"></def-video-nav-item>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu
                v-else
                style="width: 180px; height: 180px; overflow: hidden"
              >
                <div>
                  <img
                    src="https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/empty.jpg"
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
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
                  svg-color="#ffffff"
                ></def-svg-icon
                ><a style="color: #fff">历史</a>
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
                    src="https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/empty.jpg"
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
              svg-color="#ffffff"
            ></def-svg-icon
            ><a>创作中心</a>
          </div>
        </div>
      </div>
      <div class="contribute-atc" @click="toUpload">
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
        <img src="https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/logo.jpg" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/modules/account";
import { useScroll } from "@vueuse/core";
import { useFavStore } from "@/stores/modules/fav";
import { useHistoryStore } from "@/stores/modules/history";
import { ref, onMounted, onUnmounted } from "vue";
import { useSearchStore } from "@/stores/modules/search";
import { useMessageStore } from "@/stores/modules/message";

const messageStore = useMessageStore();
const searchStore = useSearchStore();
const accountStore = useAccountStore();
const router = useRouter();
const favStore = useFavStore();
const historyStore = useHistoryStore();
const input = ref<string>("");

const { y } = useScroll(window);

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

const toSearch = (searchContent: string) => {
  router
    .push({
      name: "search",
      query: { keyword: searchContent },
    })
    .then(() => {
      searchContent = searchContent.trim();
      if (searchContent !== "") {
        searchStore.addSearchHistory(searchContent);
      }
    });
};

const toUpload = () => {
  router.push({
    name: "upload",
    params: { uid: accountStore.myInfo?.uid },
  });
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
  "我的消息",
];

const changeNav = (newNav: number) => {
  router.push({
    name: messageList[newNav],
    params: { uid: accountStore.myInfo?.uid },
  });
};

//搜索框历史记录与热点的呈现
const isSearchSuggestVisible = ref<boolean>(false);

const showSearchSuggest = () => {
  isSearchSuggestVisible.value = true;
};

const hideSearchSuggest = () => {
  isSearchSuggestVisible.value = false;
};

//搜索框事件监听器
const refSearchSuggest = ref<HTMLElement | null>(null);

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
});

const handleDocumentClick = (event: MouseEvent) => {
  const searchSuggestElement = refSearchSuggest.value;
  if (
    searchSuggestElement &&
    !searchSuggestElement.contains(event.target as Node)
  ) {
    hideSearchSuggest();
  }
};

//获取热搜列表
onMounted(() => searchStore.getSearchHotList());
</script>

<style scoped lang="scss">
:deep() .el-dropdown-menu__item:hover {
  background-color: #eee !important;
}
:deep() .el-dropdown-menu__item .notify-num {
  background-color: #fa5a57;
  line-height: 16px;
  height: 16px;
  font-size: 12px;
  border-radius: 10px;
  width: 28px;
  text-align: center;
  color: #fff;
}
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
  background-image: url("https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/banner.jpg");
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
  .search-focus {
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    opacity: 1 !important;
  }
  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 20%;
    height: 42px;
    width: 250px;
    background-color: #e3e0e8;
    opacity: 0.9;
    border-radius: 8px;
    border: none;
    input {
      width: 80%;
      height: 80%;
      margin-left: 5px;
      padding: 8px;
      border: none;
      border-radius: 6px;
      background-color: #e3e0e8;
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

    .search-suggest {
      position: absolute;
      background-color: #fff;
      width: 100%;
      top: 100%;
      z-index: 1999;
      -webkit-font-smoothing: antialiased;
      max-height: 640px;
      overflow-y: auto;
      border: 1px solid #e3e5e7;
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
      object-fit: cover;
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
