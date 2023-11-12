<template>
  <div style="background-color: #f4f5f7" v-if="memberStore.memberInfo !== null">
    <div class="member-container">
      <div class="container-head">
        <div class="info-bg">
          <div class="member-info">
            <div class="avatar">
              <img :src="memberStore.memberInfo?.avatar" />
            </div>
            <div class="intro">
              <div id="name">{{ memberStore.memberInfo?.accountName }}</div>
              <div id="brief">{{ memberStore.memberInfo?.accountBrief }}</div>
            </div>
            <div
              class="button-right"
              v-show="memberStore.memberInfo.uid !== account?.uid"
            >
              <el-button
                type="success"
                size="large"
                @click="follow"
                v-if="!isFollowed"
                >关注</el-button
              >
              <el-dropdown v-else>
                <el-button type="info" size="large"> 已关注 </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="cancelFollow">取消关注</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button type="primary" size="large" @click="toLine"
                >发消息</el-button
              >
            </div>
          </div>
          <div id="shadow"></div>
        </div>
        <div class="info-route">
          <div class="route-left">
            <div
              id="home"
              @click="changeRoute(0)"
              :class="{ choosed: routeChoosed === 0 }"
            >
              <def-svg-icon
                svg-name="memberHome"
                svg-color="#00C091"
                svg-width="18px"
                svg-height="18px"
              ></def-svg-icon>
              主页
            </div>
            <div
              id="active"
              @click="changeRoute(1)"
              :class="{ choosed: routeChoosed === 1 }"
            >
              <def-svg-icon
                svg-name="memberActive"
                svg-color="#FB7299"
                svg-width="20px"
                svg-height="20px"
              ></def-svg-icon>
              动态
            </div>
            <div
              id="contribute"
              @click="changeRoute(2)"
              :class="{ choosed: routeChoosed === 2 }"
            >
              <def-svg-icon
                svg-name="memberContribute"
                svg-color="#02B5DA"
                svg-width="20px"
                svg-height="20px"
              ></def-svg-icon>
              投稿
            </div>

            <div
              id="collect"
              @click="changeRoute(3)"
              :class="{ choosed: routeChoosed === 3 }"
            >
              <def-svg-icon
                svg-name="collectionSolid"
                svg-color="#F3A034"
                svg-width="20px"
                svg-height="20px"
              ></def-svg-icon>
              收藏
            </div>
          </div>
          <div class="route-right">
            <div
              style="cursor: pointer"
              @click="changeRoute(4)"
              :class="{ choosed: routeChoosed === 4 }"
            >
              <div class="route-right-top">关注数</div>
              <div class="route-right-number">
                {{ memberStore.memberInfo?.followNum }}
              </div>
            </div>
            <div
              style="cursor: pointer"
              @click="changeRoute(5)"
              :class="{ choosed: routeChoosed === 5 }"
            >
              <div class="route-right-top">粉丝数</div>
              <div class="route-right-number">
                {{ memberStore.memberInfo?.fansNum }}
              </div>
            </div>
            <div>
              <div class="route-right-top">获赞数</div>
              <div class="route-right-number">
                {{ memberStore.memberInfo.likeNum }}
              </div>
            </div>
            <div>
              <div class="route-right-top">播放数</div>
              <div class="route-right-number">
                {{ memberStore.memberInfo.clickNum }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-body">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onUnmounted } from "vue";
import { useMemberStore } from "@/stores/modules/member";
import { useAccountStore } from "@/stores/modules/account";
import { reqAddFollow, reqIsFollow,reqCancelFollow } from "@/api/follow";
import { FollowInfo } from "@/api/follow/type";

const routeChoosed = ref(0);
const router = useRouter();
const route = useRoute();
const memberStore = useMemberStore();
const account = useAccountStore().myInfo;

const pathChoose = (newPath: string) => {
  if (newPath.includes("home")) {
    routeChoosed.value = 0;
  } else if (newPath.includes("dynamic")) {
    routeChoosed.value = 1;
  } else if (newPath.includes("video")) {
    routeChoosed.value = 2;
  } else if (newPath.includes("favlist")) {
    routeChoosed.value = 3;
  } else if (newPath.includes("fans/follow")) {
    routeChoosed.value = 4;
  } else if (newPath.includes("fans/fans")) {
    routeChoosed.value = 5;
  } else {
    routeChoosed.value = -1;
  }
};

const changeRoute = (newRoute: number) => {
  routeChoosed.value = newRoute;
  if (newRoute === 0) {
    router.push({
      name: "memberHome",
      params: { uid: memberStore.memberInfo?.uid },
    });
  } else if (newRoute === 1) {
    router.push({
      name: "memberDynamic",
      params: { uid: memberStore.memberInfo?.uid },
    });
  } else if (newRoute === 2) {
    router.push({
      name: "memberVideo",
      params: { uid: memberStore.memberInfo?.uid },
    });
  } else if (newRoute === 3) {
    router.push({
      name: "memberFavlist",
      params: { uid: memberStore.memberInfo?.uid },
    });
  } else if (newRoute === 4) {
    router.push({
      name: "memberFollow",
      params: { uid: memberStore.memberInfo?.uid },
    });
  } else if (newRoute === 5) {
    router.push({
      name: "memberFans",
      params: { uid: memberStore.memberInfo?.uid },
    });
  }
};

//获取用户信息
const getUserInfo = () => {
  memberStore.getMemberInfo(parseInt(route.params.uid as string)).then(() => {
    isFollow(memberStore.memberInfo!.uid);
  });
};


watch(
  ()=>route.params.uid,
  (newValue)=>{
    if(newValue!==null){
      getUserInfo()
    }
  },
  {immediate:true}
)

watch(
  () => route.fullPath,
  (newFullPath) => {
    pathChoose(newFullPath);
  },
  { immediate: true }
);

onUnmounted(() => memberStore.clearMemberInfo());

//跳转到私信页面
const toLine = () => {
  router.push({
    name: "messageWhisper",
    params: { uid: account?.uid },
    query: { mid: memberStore.memberInfo?.uid },
  });
};

//查看是否已经关注
const isFollowed = ref<boolean>(false);
const isFollow = async (followedUid: number) => {
  const res = await reqIsFollow(account!.uid, followedUid);
  console.log(res);
  isFollowed.value = res.data;
};

//点击关注按钮的回调
const follow = async () => {
  const followInfo: FollowInfo = {
    followedUid: memberStore.memberInfo?.uid!,
    followerUid: account?.uid!,
  };
  await reqAddFollow(followInfo);
  getUserInfo();
};

//点击取消关注按钮的回调
const cancelFollow = async ()=>{
  const followInfo: FollowInfo = {
    followedUid: memberStore.memberInfo?.uid!,
    followerUid: account?.uid!,
  };
  await reqCancelFollow(followInfo);
  getUserInfo();
}
</script>

<style scoped lang="scss">
.member-container {
  margin: 0 10%;
  .container-head {
    height: 250px;
    .info-bg {
      height: 75%;
      background-image: url("@/assets/images/memberBg.jpg");
      position: relative;

      #shadow {
        height: 36%;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-image: linear-gradient(to top, #000, #ced2e5);
        opacity: 0.2;
      }

      .member-info {
        display: flex;
        height: 40%;
        width: 100%;
        position: absolute;
        z-index: 1;
        bottom: 0;
        .avatar {
          width: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
        .intro {
          width: 70%;
          #name {
            font-size: 1.5em;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 700;
            line-height: 2em;
            color: #fff;
          }
          #brief {
            color: #e2e3e7;
            width: 80%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
          }
        }
        .button-right {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 20%;
        }
      }
    }
    .info-route {
      height: 25%;
      display: flex;
      background-color: #fff;
      .choosed {
        color: #00a1d6;
        & .route-right-top {
          color: #00a1d6 !important;
        }
      }
      .route-left {
        width: 80%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        div {
          cursor: pointer;
          margin: 0 2%;
          &:hover {
            color: #00a1d6;
          }
        }
      }
      .route-right {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          .route-right-top {
            color: #99a2aa;
          }
          .route-right-top,
          .route-right-number {
            font-size: 12px;
            line-height: 20px;
          }
          &:hover {
            color: #00a1d6;
            & .route-right-top {
              color: #00a1d6;
            }
          }
        }
      }
    }
  }
  .container-body {
    margin: 10px 0;
    border-radius: 4px;
    box-shadow: 0 0 0 1px #eee;
  }
}
</style>
