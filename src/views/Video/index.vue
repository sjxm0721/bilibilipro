<template>
  <div class="container">
    <div class="container-left">
      <div class="video-main">
        <div class="video-info">
          <div class="info-title">{{ videoInfo?.title }}</div>
          <div class="info-other">
            <span
              ><def-svg-icon
                svg-name="clickNum"
                svg-color="#707070"
              ></def-svg-icon
              >{{ videoInfo?.clickNum }}</span
            >
            <span
              ><def-svg-icon
                svg-name="barrageNum"
                svg-color="#707070"
              ></def-svg-icon
              >{{ videoInfo?.barrageNum }}</span
            >
            <span>{{ videoInfo?.postTime }}</span>
            <span
              ><def-svg-icon svg-name="forbid"></def-svg-icon
              >未经作者授权，禁止转载</span
            >
          </div>
        </div>
        <div class="video-player" v-if="videoInfo">
          <def-video-player
            :poster="videoInfo?.poster"
            :src="videoInfo?.src"
            :danmakuContent="danmakuContent"
            :videoId="videoInfo?.videoId"
            :getDanmakuList="getDanmakuList"
            ref="videoPlayer"
          ></def-video-player>
        </div>
        <div class="video-sl">
          <span
            @click="clickLike(isLiked)"
            @mouseover="changeSvgColor('like')"
            @mouseleave="svgColorReturn"
            :style="{ color: isLiked ? '#06aeec' : '#000' }"
            ><def-svg-icon
              svg-name="like"
              :svg-color="
                svgColors.like === true || isLiked ? '#06aeec' : '#61666D'
              "
              svg-height="25px"
              svg-width="25px"
            ></def-svg-icon
            >{{ videoInfo?.likeNum }}</span
          >
          <span
            @click="clickCoin"
            @mouseover="changeSvgColor('coin')"
            @mouseleave="svgColorReturn"
            ><def-svg-icon
              svg-name="coin"
              :svg-color="svgColors.coin === true ? '#06aeec' : '#61666D'"
              svg-height="25px"
              svg-width="25px"
            ></def-svg-icon
            >{{ videoInfo?.coinNum }}</span
          >
          <span
            @click="clickFav"
            @mouseover="changeSvgColor('collectionSolid')"
            @mouseleave="svgColorReturn"
            :style="{ color: isFav ? '#06aeec' : '#000' }"
            ><def-svg-icon
              svg-name="collectionSolid"
              :svg-color="
                svgColors.collectionSolid||isFav === true ? '#06aeec' : '#61666D'
              "
              svg-height="25px"
              svg-width="25px"
            ></def-svg-icon
            >{{ videoInfo?.favNum }}</span
          >
        </div>
      </div>
      <div class="video-label">
        <div class="video-desc">
          {{ videoInfo?.videoBrief }}
        </div>
        <div class="video-tags">
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>dwaldwajdlakwdalwkdj</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
          <div class="video-tag">
            <el-tag class="ml-2" type="info" round>Tag 4</el-tag>
          </div>
        </div>
      </div>
      <div class="video-comment" v-if="videoInfo">
        <def-comment :videoId="videoInfo?.videoId" :key="$route.fullPath"></def-comment>
      </div>
    </div>
    <div class="container-right">
      <div class="author">
        <div class="author-avatar" @click="toMember">
          <img :src="accountInfo?.avatar" />
        </div>
        <div class="author-info">
          <div class="info-top">
            <a @click="toMember">{{ accountInfo?.accountName }}</a>
            <a
              v-if="accountStore.myInfo?.uid !== accountInfo?.uid"
              @mouseover="changeSvgColor('messageSolid')"
              @mouseleave="svgColorReturn"
              @click="toLine"
              ><def-svg-icon
                svg-name="messageSolid"
                :svg-color="
                  svgColors.messageSolid === true ? '#06aeec' : '#61666D'
                "
                svg-width="13px"
                svg-height="13px"
              ></def-svg-icon
              >发消息</a
            >
          </div>
          <div class="info-middle">
            {{ accountInfo?.accountBrief }}
          </div>
          <div class="info-bottom" v-if="accountStore.myInfo?.uid !== accountInfo?.uid">
            <el-button type="primary" v-if="!isFollowed" @click="clickFollow">
              <def-svg-icon svg-name="plus" svg-color="#ffffff"></def-svg-icon
              >&nbsp;&nbsp; 关注&nbsp;{{ accountInfo?.fansNum }}
            </el-button>

            <el-dropdown v-else>
              <el-button type="info">
                <def-svg-icon
                  svg-name="cancelFollow"
                  svg-color="#ffffff"
                ></def-svg-icon>
                &nbsp;&nbsp; 已关注&nbsp;{{ accountInfo?.fansNum }}
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="clickCancelFollow"
                    >取消关注</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="barrage-list">
        <el-collapse>
          <el-collapse-item title="弹幕列表" name="list">
            <div class="table">
              <table style="width: 100%; table-layout: fixed">
                <tr>
                  <th style="width: 15%">时间</th>
                  <th style="width: 60%">弹幕内容</th>
                  <th style="width: 25%">发送时间</th>
                </tr>
                <tr v-for="item in danmakuContent" :key="item.barrageId">
                  <td>{{ timeConvert(parseInt(item.time.toString())) }}</td>
                  <td class="barrage-content">
                    {{ item.text }}
                  </td>
                  <td>{{ item.postTime?.slice(5) }}</td>
                </tr>
              </table>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="video-list">
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
        <div class="other-video">
          <def-video-panel-item></def-video-panel-item>
        </div>
      </div>
    </div>
  </div>
  <div class="dialog-fav" v-show="showFav">
    <div class="dialog-fav-bomb">
      <div class="collection">
        <div class="title">
          添加到文件夹
          <i class="close" @click="closeFav"
            ><def-svg-icon svg-name="close" svg-color="#AFB5BC"></def-svg-icon
          ></i>
        </div>
        <div class="content">
          <div class="group-list">
            <ul>
              <li
                v-for="item in favStore.fatherFavList"
                :key="item.favId"
                @click.prevent="changeFatherFav(item)"
              >
                <label style="cursor: pointer; display: block">
                  <input
                    type="checkbox"
                    style="
                      font-size: 18px;
                      width: 0;
                      height: 0;
                      cursor: pointer;
                      vertical-align: middle;
                      display: none;
                    "
                  />
                  <i
                    :style="{
                      background:
                        favVideoPostInfo.fatherDic === item.favId
                          ? `url('${bgFavChosed}')`
                          : `url('${bgCheckbox}')`,
                    }"
                  ></i>
                  <span class="fav-title">{{ item.favTitle }}</span>
                  <span class="count">{{ item.favNum }}</span>
                </label>
              </li>
            </ul>
            <div class="add-group">
              <div class="add-btn" v-if="!showAddGroup" @click="showGroup">
                新建收藏夹
              </div>
              <div v-else>
                <form class="input-group">
                  <input
                    type="text"
                    class="input"
                    maxlength="20"
                    placeholder="最多可以输入20个字"
                    v-model="favListForm.favTitle"
                  />
                  <button type="submit" class="submit" @click="addGroup">
                    新建
                  </button>
                  <button type="submit" class="cancel" @click="hideAddGroup">
                    取消
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <button
            class="btn1"
            :class="{ disabled: isFav !== true }"
            @click="deleteVideoFromFav"
          >
            取消收藏
          </button>
          <button
            class="btn2"
            :class="{ disabled: favVideoPostInfo.fatherDic === -1 }"
            @click="addVideo2Fav"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Video } from "@/api/video/type";
import type { AccountInfoData } from "@/api/account/type";
import { reqGetVideoInfoByUid } from "@/api/video";
import { reqGetAccountInfoById } from "@/api/account";
import type { BarrageData } from "@/api/barrage/type";
import { reqGetVideoBarrage } from "@/api/barrage/index";
import { useAccountStore } from "@/stores/modules/account";
import { timeConvert } from "@/utils/timeFormator";
import { reqIsFollow, reqAddFollow, reqCancelFollow } from "@/api/follow";
import type { FollowInfo } from "@/api/follow/type";
import { reqAddLike, reqCancelLike } from "@/api/like";
import type { LikePostData } from "@/api/like/type";
import { ElMessage } from "element-plus";
import { throttle } from "lodash";
import { useLikeStore } from "@/stores/modules/like";
import { useFavStore } from "@/stores/modules/fav";
import type {message} from '@/utils/websocketClass'
import { useWebSocketStore } from "@/stores/modules/websocket";
import type {
  FavListPostInfo,
  FavList,
  FavVideoPostInfo,
  FavPage
} from "@/api/fav/type";
import { reqAddFatherFav, reqAddFavVideo,reqDeleteFavVideo } from "@/api/fav";

const favStore = useFavStore();
const accountStore = useAccountStore();
const route = useRoute();
const router = useRouter();
const websocketStore = useWebSocketStore()

const svgColors: any = reactive({
  like: false,
  coin: false,
  collectionSolid: false,
  messageSolid: false,
});

const changeSvgColor = (svgName: string) => {
  svgColors[svgName] = true;
};

const svgColorReturn = () => {
  for (const key in svgColors) {
    svgColors[key] = false;
  }
};

//获取视频相关信息
const videoInfo = ref<Video>();
const getVideoInfo = async () => {
  const res = await reqGetVideoInfoByUid(Number(route.params.videoId.slice(2)));
  videoInfo.value = res.data;
  getAccountInfo(videoInfo.value.uid);
};


//获取投稿人相关信息
const accountInfo = ref<AccountInfoData>();
const getAccountInfo = async (uid: number) => {
  const res = await reqGetAccountInfoById(uid);
  accountInfo.value = res.data;
  isFollow(accountInfo.value.uid);
};

//获取视频弹幕列表
const danmakuContent = ref<BarrageData[]>([]);

const getDanmakuList = async () => {
  const res = await reqGetVideoBarrage(Number(route.params.videoId.slice(2)));
  danmakuContent.value = res.data;
  danmakuContent.value.forEach((item: BarrageData) => {
    if (item.uid === accountStore.myInfo?.uid) item.isMe = true;
    else item.isMe = false;
  });
};

//播放器元素
const videoPlayer = ref<null | Element>(null);

watch(danmakuContent, (newDanmakuContent: BarrageData[]) => {
  if (videoPlayer.value && newDanmakuContent.length > 0) {
    // 更新播放器
    (videoPlayer.value as any).updateDanmaku(newDanmakuContent);
  }
});

//前往用户页面
const toMember = () => {
  router.push({
    name: "memberHome",
    params: { uid: accountInfo.value?.uid },
  });
};

//前往私信页面
const toLine = () => {
  router.push({
    name: "messageWhisper",
    params: { uid: accountStore.myInfo?.uid },
    query: { mid: accountInfo.value?.uid },
  });
};

//查看是否已经关注
const isFollowed = ref<boolean>(false);
const isFollow = async (followedUid: number) => {
  const res = await reqIsFollow(accountStore.myInfo!.uid, followedUid);
  isFollowed.value = res.data;
};

//点击关注按钮的回调
const follow = async () => {
  const followInfo: FollowInfo = {
    followedUid: accountInfo.value!.uid,
    followerUid: accountStore.myInfo?.uid!,
  };
  await reqAddFollow(followInfo);
};
const clickFollow = () => {
  follow().then(async () => {
    await getAccountInfo(videoInfo.value!.uid);
  });
};

//点击取消关注的回调
const cancelFollow = async () => {
  const followInfo: FollowInfo = {
    followedUid: accountInfo.value!.uid,
    followerUid: accountStore.myInfo?.uid!,
  };
  await reqCancelFollow(followInfo);
};
const clickCancelFollow = () => {
  cancelFollow().then(async () => {
    await getAccountInfo(videoInfo.value!.uid);
  });
};

//点击点赞按钮的回调
const likeMessage = reactive<message>({
  isSystem:"0",
  fromUid:accountStore.myInfo?.uid,
  toUid:undefined,
  isAll:false,
  type:"1",
  videoId:undefined
})
const likeStore = useLikeStore();
const isLiked = ref<boolean>(false);
watch(videoInfo, (newVideoInfo) => {
  // 在 videoInfo 变化时重新计算 isLiked
  if (newVideoInfo) {
    isLiked.value = likeStore.videoLikeList.some((likeList) => {
      return (
        likeList.videoId === newVideoInfo.videoId && likeList.status === "0"
      );
    });
  }
});
const clickLike = throttle(async (status: boolean) => {
  let likePostData: LikePostData = {
    fromUid: accountStore.myInfo?.uid!,
    toUid: accountInfo.value?.uid!,
    type: "0",
    videoId: videoInfo.value?.videoId,
    status: status === true ? "1" : "0",
  };
  if (status === true) {
    //点赞状态
    const res = await reqCancelLike(likePostData);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "取消点赞成功",
      });
      
      likeStore.getLikeList(accountStore.myInfo?.uid!, "0").then(() => {
        getVideoInfo();
      });
    } else {
      ElMessage({
        type: "error",
        message: "取消点赞失败",
      });
    }
  } else {
    //非点赞状态
    const res = await reqAddLike(likePostData);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "点赞成功",
      });
      likeMessage.videoId = videoInfo.value?.videoId
      likeMessage.toUid = accountInfo.value?.uid
      websocketStore.sendMessage(JSON.stringify(likeMessage))
      likeStore.getLikeList(accountStore.myInfo?.uid!, "0").then(() => {
        getVideoInfo();
      });
    } else {
      ElMessage({
        type: "error",
        message: "点赞失败",
      });
    }
  }
}, 300);

//点击投币按钮的回调
const clickCoin = () => {
  console.log("点击了投币按钮");
};

//收藏视频相关
const showFav = ref<boolean>(false);
const bgFavChosed: string = "../src/assets/images/favChosed.jpg";
const bgCheckbox: string = "../src/assets/images/checkbox.jpg";
//父收藏
const favListForm = reactive<FavListPostInfo>({
  uid: accountStore.myInfo!.uid,
  isDic: "1",
  favTitle: "",
  favPoster: "../src/assets/images/basicFavPoster.jpg",
  isPublic: "0",
});
//子收藏
const favVideoPostInfo = reactive<FavVideoPostInfo>({
  uid: accountStore.myInfo!.uid,
  videoId: -1,
  fatherDic: -1,
});

//点击收藏按钮的回调
const clickFav = () => {
  showFav.value = true;
};

//关闭收藏的回调
const closeFav = () => {
  showFav.value = false;
  favVideoPostInfo.fatherDic = -1;
};

const showAddGroup = ref<boolean>(false);
const showGroup = () => {
  showAddGroup.value = true;
};
const hideAddGroup = () => {
  showAddGroup.value = false;
  favListForm.favTitle = "";
};

const addGroup = async () => {
  const res = await reqAddFatherFav(favListForm);
  if (res.code == 200) {
    favStore.getFatherFavList().then(() => {
      hideAddGroup();
    });
  }
};

const changeFatherFav = (fatherFav: FavList) => {
  if (fatherFav.favId !== favVideoPostInfo.fatherDic) {
    favVideoPostInfo.fatherDic = fatherFav.favId!;
  } else {
    favVideoPostInfo.fatherDic = -1;
  }
};

const favPage: FavPage = {
  uid: accountStore.myInfo?.uid!,
  page: 1,
  pageSize: 10,
};

const isFav = ref<boolean>(false)
//判断是否已经收藏了视频
watch(videoInfo, (newVideoInfo) => {
  // 在 videoInfo 变化时重新计算 isLiked
  if (newVideoInfo) {
    isFav.value = favStore.totalFavVideo.some((favList) => {
      return (
        favList.videoId === newVideoInfo.videoId
      );
    });
  }
});

//将视频添加入收藏夹
const addVideo2Fav = async () => {
  favVideoPostInfo.videoId = videoInfo.value?.videoId!;
  const res = await reqAddFavVideo(favVideoPostInfo);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "加入收藏成功",
    });
    favVideoPostInfo.fatherDic = -1;
    favStore.getFatherFavList();
    favStore.getHistoreFavInfo(favPage);
    favStore.getTotalFavVideo().then(()=>{
      getVideoInfo();
    })
  }
};

//删除收藏夹视频
const deleteVideoFromFav =async ()=>{
  const res = await reqDeleteFavVideo(accountStore.myInfo?.uid!,videoInfo.value?.videoId!)
  if(res.code==200){
    favStore.getFatherFavList();
    favStore.getHistoreFavInfo(favPage);
    favStore.getTotalFavVideo().then(()=>{
      getVideoInfo();
    })
  }
}

watch(()=>route.params.videoId,
  (newValue)=>{
    if(newValue!==null){
      getVideoInfo()
      getDanmakuList()
    }
  },{
    immediate:true
  }
)
</script>

<style scoped lang="scss">
.dialog-fav {
  background-color: rgba($color: #000000, $alpha: 0.65);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99999;
  .dialog-fav-bomb {
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    margin-bottom: 50px;
    .collection {
      width: 420px;
      border-radius: 4px;

      overflow: hidden;
      .title {
        position: relative;
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        border-bottom: #e3e5e7;
        .close {
          position: absolute;
          right: 20px;
          cursor: pointer;
          height: 50px;
          line-height: 50px;
        }
      }
      .content {
        height: 300px;
        overflow: auto;
        padding: 0 36px;
        .group-list {
          max-height: 300px;
          padding-bottom: 14px;
          ul {
            position: relative;
            margin-top: 24px;
            min-height: 210px;
          }
          li {
            padding-bottom: 24px;
            color: #18191c;
            cursor: pointer;
            &:hover {
              color: #00aeec;
            }
            input[type="checkbox"] + i {
              width: 20px;
              height: 20px;
              display: inline-block;
              margin-right: 18px;
              vertical-align: middle;
            }
            .fav-title {
              max-width: 220px;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: middle;
            }
            .count {
              float: right;
              color: #61666d;
              font-size: 12px;
            }
          }
          .add-group {
            margin-bottom: 5px;
            width: 348px;
            .add-btn {
              height: 36px;
              line-height: 34px;
              padding: 0 34px;
              border: 1px solid #9499a0;
              border-radius: 4px;
              background: url("@/assets/images/addGroup.jpg") no-repeat 10px
                center;
              font-size: 12px;
              color: #61666d;
              cursor: pointer;
            }
            .input-group {
              height: 36px;
              line-height: 34px;
              border: 1px solid #00aeec;
              border-radius: 4px;
              position: relative;
              .input {
                border: none;
                font-size: 12px;
                width: 150px;
                margin-left: 10px;
                height: 100%;
                background: transparent;
                color: #18191c;
                outline: none;
                padding: 0;
              }
              .submit {
                float: right;
                height: 34px;
                width: 70px;
                background: #d9f1f9;
                border: none;
                border-left: 1px solid #00aeec;
                border-radius: 0 4px 4px 0;
                color: #00aeec;
                cursor: pointer;
              }
              .cancel {
                float: right;
                height: 34px;
                width: 70px;
                background: #eee;
                border: none;
                border-left: 1px solid #00aeec;
                border-radius: 0 4px 4px 0;
                color: #999;
                cursor: pointer;
              }
            }
          }
        }
      }
      .bottom {
        height: 76px;
        text-align: center;
        margin: 0 36px;
        border-top: 1px solid #e3e5e7;
        .disabled {
          background-color: #e3e5e7 !important;
          color: #9499a0 !important;
          pointer-events: none !important;
        }
        .btn1,
        .btn2 {
          font-size: 14px;
          width: 140px;
          margin: 0 10px 10px 0;
          height: 40px;
          margin-top: 18px;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn1{
          background-color: #B68624;
          &:hover{
            background-color: #D2B48C;
          }
        }
        .btn2 {
          background-color: #00aeec;
          &:hover {
            background-color: #99d7f6;
          }
        }
      }
    }
  }
}
.container {
  margin: 20px 50px;
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .container-left {
    width: 70%;
    .video-main {
      height: 650px;
      .video-info {
        margin-bottom: 20px;
        .info-title {
          padding: 2% 0;
          font-size: 1.4em;
          line-height: 1.5em;
        }
        .info-other {
          & > span {
            font-size: 0.9em;
            color: #707070;
            margin: 1%;
            svg {
              margin-right: 1%;
            }
          }
        }
      }
      .video-sl {
        height: 10%;
        position: relative;
        border-bottom: 1px solid rgba($color: #9499a0, $alpha: 0.5);

        & > span {
          cursor: pointer;
          svg {
            color: #61666d;
            margin-right: 10px;
          }
          display: inline-block;
          margin: 3% 5% 0 0;
          &:hover {
            color: #06aeec !important;
          }
        }
      }
    }
    .video-label {
      margin-top: 20px;
      border-bottom: 1px solid rgba($color: #9499a0, $alpha: 0.5);
      .video-desc {
        color: rgba($color: #000, $alpha: 0.8);
        font-size: 1.2em;
        line-height: 1.5em;
      }
      .video-tags {
        margin-top: 10px;

        .video-tag {
          display: inline-block;
          margin: 0 8px 16px 0;
        }
      }
    }
  }
  .container-right {
    width: 28%;
    .author {
      height: 100px;
      display: flex;
      align-items: center;
      .author-avatar {
        width: 18%;
      }
      .author-info {
        width: 82%;
        .info-top {
          & > a:nth-child(1) {
            cursor: pointer;
            font-size: 1.2em;
            font-weight: 400;
            margin-right: 10px;
          }

          & > a:nth-child(2) {
            cursor: pointer;
            color: #61666d;
            opacity: 0.7;
            &:hover {
              color: #06aeec;
            }
            svg {
              transform: translateY(-25%);
            }
          }
        }

        .info-middle {
          line-height: 1.5em;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
          color: rgba($color: #707070, $alpha: 0.6);
        }
      }
    }

    .barrage-list {
      .table {
        height: 410px;
        padding: 8px;
        overflow: auto;
        tr {
          color: #a2a4a8;
          th {
            text-align: left;
            font-size: 0.7em;
          }
          td {
            word-wrap: break-word;
            font-size: 0.7em;
          }
          .barrage-content {
            width: 90%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            color: black;
          }
        }
      }
    }

    .video-list {
      margin-top: 25px;
      border-top: 1px solid rgba($color: #9499a0, $alpha: 0.5);
      .other-video {
        margin-top: 18px;
        width: 100%;
        height:85px;
      }
    }
  }
}

:deep() .el-collapse {
  border: none;
}

:deep() .el-collapse-item__header {
  background-color: #f1f2f3;
  padding: 15px;
  font-size: 1.1em;
  border-radius: 5px;
}
</style>
