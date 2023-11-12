<template>
  <div class="home-main-container">
    <div class="container-left">
      <div class="home-video">
        <div class="video-nav">
          <span class="label">{{
            accountStore.myInfo?.uid === memberStore.memberInfo?.uid ? "我的视频" : "TA的视频"
          }}</span>
          <span class="label-show-num">{{ videoHomePageResult?.total }}</span>
          <div
            class="order-type"
            @click="changeOrder(0)"
            :class="{ choosed: videoHomePage.order === 0 }"
          >
            最新发布
          </div>
          <div
            class="order-type"
            @click="changeOrder(1)"
            :class="{ choosed: videoHomePage.order === 1 }"
          >
            最多播放
          </div>
          <div
            class="order-type"
            @click="changeOrder(2)"
            :class="{ choosed: videoHomePage.order === 2 }"
          >
            最多收藏
          </div>
          <div
            class="more-video"
            v-show="videoHomePageResult?.total as number>8"
            @click="toVideo"
          >
            <span>更多</span>
          </div>
        </div>
        <div class="video-body">
          <div
            v-if="videoHomePageResult"
            class="video"
            v-for="(item, index) in videoHomePageResult?.record"
            :key="index"
          >
            <def-video-member-item :video="item"></def-video-member-item>
          </div>
        </div>
      </div>
      <div class="home-favlist">
        <div class="favlist-nav">
          <span class="label">{{
            accountStore.myInfo?.uid === memberStore.memberInfo?.uid ? "我的收藏" : "TA的收藏"
          }}</span>
          <span class="label-show-num">{{ fatherFavList.length }}</span>
          <div
            class="more-fav"
            v-show="fatherFavList.length!>=4"
            @click="toFav()"
          >
            <span>更多</span>
          </div>
        </div>
        <div class="fav-body">
          <def-fav-list
            v-for="item in fatherFavList"
            :key="item.favId"
            :fatherFav="item"
            @click="toFav(item.favId)"
          ></def-fav-list>
        </div>
      </div>
      <!-- <div class="home-like">
        <div class="like-nav">
          <span class="label">最近点赞的视频</span>
          <span class="label-show-num">11</span>
        </div>
        <div class="video-body">
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
        </div>
      </div> -->
      <!-- <div class="home-coin">
        <div class="coin-nav">
          <span class="label">最近投币的视频</span>
          <span class="label-show-num">11</span>
        </div>
        <div class="video-body">
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
          <div class="video">
            <def-video-member-item></def-video-member-item>
          </div>
        </div>
      </div> -->
    </div>
    <div class="container-right">
      <div style="margin: 20px">个人资料</div>
      <div class="personal-info">
        <div>UID&nbsp;&nbsp;&nbsp;{{ memberStore.memberInfo?.uid }}</div>
        <div>生日&nbsp;&nbsp;&nbsp;{{ memberStore.memberInfo?.birthday }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { VideoPage } from "@/api/member/type";
import { reqMemberVideoPage } from "@/api/member/index";
import type { PageVideoData } from "@/api/video/type";
import { useRoute, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/modules/member";
import { useAccountStore } from "@/stores/modules/account";
import type { FavList } from "@/api/fav/type";
import { reqGetFatherFavList } from "@/api/fav";

const accountStore = useAccountStore();
const memberStore = useMemberStore();
const route = useRoute();
const router = useRouter();

const videoHomePage = ref<VideoPage>({
  uid: Number(route.params.uid as string),
  order: 0,
  page: 1,
  pageSize: 8,
});

const changeOrder = (order: number) => {
  videoHomePage.value.order = order;
  getVideoHomePage();
};

//重新获取用户视频数据
const videoHomePageResult = ref<PageVideoData>();
const getVideoHomePage = async () => {
  const { uid, order, page, pageSize } = videoHomePage.value;
  const res = await reqMemberVideoPage(uid, order, page, pageSize);
  videoHomePageResult.value = res.data;
};

onMounted(() => {
  getVideoHomePage();
  getFatherFavList();
});

const fatherFavList = ref<FavList[]>([]);
const getFatherFavList = async () => {
  const res = await reqGetFatherFavList(parseInt(route.params.uid as string));
  fatherFavList.value = res.data;
};

//点击更多跳转
const toVideo = () => {
  router.push({
    name: "memberVideo",
    params: { uid: memberStore.memberInfo?.uid },
  });
};

const toFav = (favId?: number) => {
  router.push({
    name: "memberFavlist",
    params: { uid: memberStore.memberInfo?.uid },
    query: { favId },
  });
};
</script>

<style scoped lang="scss">
.home-main-container {
  display: flex;
  justify-content: space-between;
  .label {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #1296db;
    }
  }
  .label-show-num {
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 20%;
    height: 18px;
    background-color: #f6fafb;
    font-size: 12px;
    line-height: 18px;
    padding: 0 5px;
    margin-left: 10px;
  }
  .container-left {
    width: 66%;
    background-color: #fff;
    padding: 30px 15px;
    vertical-align: baseline;
    .video-body {
      max-height: 520px;
      margin-top: 20px;
      display: grid;
      justify-content: space-between;
      grid-template-columns: 23% 23% 23% 23%;
      overflow: hidden;
      border-bottom: 1px solid rgba($color: #9499a0, $alpha: 0.3);
      .video {
        margin-bottom: 20px;
        font-size: 12px;
        height: 165px;
      }
    }
    .home-video {
      position: relative;
      .video-nav {
        .choosed {
          color: #1296db;
          border-bottom: 2px solid #1296db;
        }
        .order-type {
          display: inline-block;
          margin-left: 20px;
          padding-bottom: 10px;
          cursor: pointer;
        }
        .more-video {
          position: absolute;
          top: 0;
          right: 20px;
          height: 25px;
          width: 50px;
          border: 1px solid #b7c0cc;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          > span {
            line-height: 25px;
            color: #b7c0cc;
          }
          &:hover {
            border-color: #1296db;
            > span {
              color: #1296db;
            }
          }
        }
      }
    }

    .home-favlist {
      margin-top: 30px;
      position: relative;
      .favlist-nav {
        .more-fav {
          position: absolute;
          top: 0;
          right: 20px;
          height: 25px;
          width: 50px;
          border: 1px solid #b7c0cc;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          > span {
            line-height: 25px;
            color: #b7c0cc;
          }
          &:hover {
            border-color: #1296db;
            > span {
              color: #1296db;
            }
          }
        }
      }
      .fav-body {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 23% 23% 23% 23%;
        grid-column-gap: 2%;
        overflow: hidden;
      }
    }
    .home-like {
      margin-top: 30px;
    }
    .home-coin {
      margin-top: 30px;
    }
  }
  .container-right {
    width: 33%;
    height: 150px;
    background-color: #fff;
    .personal-info {
      height: 80px;
      margin: 20px;
      border-top: 1px solid rgba($color: #9499a0, $alpha: 0.3);
      display: flex;
      align-items: center;
      > div {
        font-size: 12px;
        color: #6c757a;
        width: 50%;
      }
    }
  }
}
</style>
