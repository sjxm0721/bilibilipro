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
            :videoId = "videoInfo?.videoId"
            :getDanmakuList="getDanmakuList"
            ref="videoPlayer"
          ></def-video-player>
        </div>
        <div class="video-sl">
          <span @mouseover="changeSvgColor('like')" @mouseleave="svgColorReturn"
            ><def-svg-icon
              svg-name="like"
              :svg-color="svgColors.like"
              svg-height="25px"
              svg-width="25px"
            ></def-svg-icon
            >{{ videoInfo?.likeNum }}</span
          >
          <span @mouseover="changeSvgColor('coin')" @mouseleave="svgColorReturn"
            ><def-svg-icon
              svg-name="coin"
              :svg-color="svgColors.coin"
              svg-height="25px"
              svg-width="25px"
            ></def-svg-icon
            >{{ videoInfo?.coinNum }}</span
          >
          <span
            @mouseover="changeSvgColor('collectionSolid')"
            @mouseleave="svgColorReturn"
            ><def-svg-icon
              svg-name="collectionSolid"
              :svg-color="svgColors.collectionSolid"
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
          <def-comment :videoId="videoInfo?.videoId"></def-comment>
      </div>
    </div>
    <div class="container-right">
      <div class="author">
        <div class="author-avatar">
          <img :src="accountInfo?.avatar" />
        </div>
        <div class="author-info">
          <div class="info-top">
            <a>{{ accountInfo?.accountName }}</a>
            <a
              @mouseover="changeSvgColor('messageSolid')"
              @mouseleave="svgColorReturn"
              ><def-svg-icon
                svg-name="messageSolid"
                :svg-color="svgColors.messageSolid"
                svg-width="13px"
                svg-height="13px"
              ></def-svg-icon
              >发消息</a
            >
          </div>
          <div class="info-middle">
            {{ accountInfo?.accountBrief }}
          </div>
          <div class="info-bottom">
            <el-button type="primary">
              <def-svg-icon svg-name="plus" svg-color="#ffffff"></def-svg-icon
              >&nbsp;&nbsp; 关注&nbsp;{{ accountInfo?.fansNum }}
            </el-button>
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
                <tr v-for="(item) in danmakuContent" :key="item.barrageId">
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
</template>

<script setup lang="ts">
import { onMounted, reactive, ref,watch } from "vue";
import { useRoute } from "vue-router";
import type { Video } from "@/api/video/type";
import type {AccountInfoData} from '@/api/account/type'
import { reqGetVideoInfoByUid } from "@/api/video";
import {reqGetAccountInfoById} from '@/api/account'
import type{BarrageData} from '@/api/barrage/type'
import {reqGetVideoBarrage} from '@/api/barrage/index'
import { useAccountStore } from "@/stores/modules/account";
import { timeConvert } from "@/utils/timeFormator";

const account=useAccountStore().myInfo;
const route = useRoute();

const svgColors: any = reactive({
  like: "#61666D",
  coin: "#61666D",
  collectionSolid: "#61666D",
  messageSolid: "#61666D",
});

const changeSvgColor = (svgName: string) => {
  svgColors[svgName] = "#06aeec";
};

const svgColorReturn = () => {
  for (const key in svgColors) {
    svgColors[key] = "#61666D";
  }
};

//获取视频相关信息
const videoInfo = ref<Video>();
const getVideoInfo = async () => {
  const res = await reqGetVideoInfoByUid(Number(route.params.videoId.slice(2)));
  videoInfo.value = res.data;
  getAccountInfo(videoInfo.value.uid)
};

onMounted(() => getVideoInfo());

//获取投稿人相关信息
const accountInfo = ref<AccountInfoData>()
const getAccountInfo = async (uid:number)=>{
  const res = await reqGetAccountInfoById(uid)
  accountInfo.value = res.data
}


//获取视频弹幕列表
const danmakuContent = ref<BarrageData[]>([])

const getDanmakuList = async()=>{
    const res = await reqGetVideoBarrage(Number(route.params.videoId.slice(2)))
    danmakuContent.value = res.data
    danmakuContent.value.forEach((item:BarrageData)=>{
      if(item.uid===account?.uid)
      item.isMe = true
      else item.isMe = false
    })
}
onMounted(()=>getDanmakuList())

//播放器元素
const videoPlayer = ref<null | Element>(null);

  watch(danmakuContent, (newDanmakuContent:BarrageData[]) => {
  if (videoPlayer.value && newDanmakuContent.length > 0) {
    // 更新播放器
    (videoPlayer.value as any).updateDanmaku(newDanmakuContent);
  }
});

</script>

<style scoped lang="scss">
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
            color: #06aeec;
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
        margin-top: 20px;
        width: 100%;
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
