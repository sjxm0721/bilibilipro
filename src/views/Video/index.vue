<template>
  <div class="container">
    <div class="container-left">
      <div class="video-main">
        <div class="video-info">
          <div class="info-title">【梅丽莎】 我家主人不可能那么色气！</div>
          <div class="info-other">
            <span
              ><def-svg-icon
                svg-name="clickNum"
                svg-color="#707070"
              ></def-svg-icon
              >114514</span
            >
            <span
              ><def-svg-icon
                svg-name="barrageNum"
                svg-color="#707070"
              ></def-svg-icon
              >11037</span
            >
            <span>1922-2-22 15:49:00</span>
            <span
              ><def-svg-icon svg-name="forbid"></def-svg-icon
              >未经作者授权，禁止转载</span
            >
          </div>
        </div>
        <div class="video-player">
          <def-video-player></def-video-player>
        </div>
        <div class="video-sl">
          <span @mouseover="changeSvgColor('like')" @mouseleave="svgColorReturn"
            ><def-svg-icon
              svg-name="like"
              :svg-color="svgColors.like"
              svg-height="25px"
              svg-width="25px"
            ></def-svg-icon
            >110</span
          >
          <span @mouseover="changeSvgColor('coin')" @mouseleave="svgColorReturn"
            ><def-svg-icon
              svg-name="coin"
              :svg-color="svgColors.coin"
              svg-height="25px"
              svg-width="25px"
            ></def-svg-icon
            >50</span
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
            >10</span
          >
        </div>
      </div>
      <div class="video-label">
        <div class="video-desc">
          <!-- <input type="text"> -->
          dwlkdawdjawldjawkdjwalkdjawioueueqwoeuqieucmxz,ccmxnz,cmzx,cxznc
          dwadjlkawjdlawdjwaldjawkl32 111额娃饿饿饿饿饿
          饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿饿
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
      <div class="video-comment">
        <div class="comment-head">
          <div class="comment-info">
            <div class="head-left">评论</div>
            <div class="head-num">529</div>
            <div class="order-hotest">
              <span
                style="cursor: pointer"
                :class="{
                  choosed: choosedOrder === 0,
                  'mouse-in': hoverOrder === 0,
                }"
                @click="changeOrder(0)"
                @mouseenter="mouseInOrder(0)"
                @mouseleave="mouseOutOrder"
                >最热</span
              >
            </div>
            <div class="order-newest">
              <span
                style="cursor: pointer"
                :class="{
                  choosed: choosedOrder === 1,
                  'mouse-in': hoverOrder === 1,
                }"
                @click="changeOrder(1)"
                @mouseenter="mouseInOrder(1)"
                @mouseleave="mouseOutOrder"
                >最新</span
              >
            </div>
          </div>
          <div class="comment-publish">
            <div class="avatar-big">
              <img src="@/assets/images/avatar.jpg" />
            </div>
            <div class="textarea-and-button">
              <el-input
              v-model="input"
                :rows="2"
                type="input"
                placeholder="Please input"
                style="width: 85%;"
                size="large"
              />
              <el-button type="primary" size="large">发布</el-button>
            </div>
          </div>
        </div>
        <div class="comment-body">
          <def-comment></def-comment>
        </div>
      </div>
    </div>
    <div class="container-right">
      <div class="author">
        <div class="author-avatar">
          <img src="@/assets/images/avatar.jpg" />
        </div>
        <div class="author-info">
          <div class="info-top">
            <a>妹抖梅莉莎</a>
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
            觉得无论多久我都绝望了多久啊来得及啊无论多久哇来得及挖了多久啊我的家啊无论多久
          </div>
          <div class="info-bottom">
            <el-button type="primary" size="large">
              <def-svg-icon svg-name="plus" svg-color="#ffffff"></def-svg-icon
              >&nbsp;&nbsp; 关注&nbsp;114514
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
                <tr>
                  <td>00:26</td>
                  <td class="barrage-content">
                    讲道理我懂了我多久啊老王的裤袜绝对零度就未来的恐惧啊为了打击我
                  </td>
                  <td>09-24 21:35</td>
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
import { reactive, ref } from "vue";
const svgColors: any = reactive({
  like: "#61666D",
  coin: "#61666D",
  collectionSolid: "#61666D",
  messageSolid: "#61666D",
});

const input = ref('')

const choosedOrder = ref(0);
const hoverOrder = ref(-1);

const changeOrder = (newOrder: number) => {
  hoverOrder.value = -1;
  choosedOrder.value = newOrder;
};

const mouseInOrder = (newOrder: number) => {
  if (newOrder != choosedOrder.value) hoverOrder.value = newOrder;
};

const mouseOutOrder = () => {
  hoverOrder.value = -1;
};

const changeSvgColor = (svgName: string) => {
  svgColors[svgName] = "#06aeec";
};

const svgColorReturn = () => {
  for (const key in svgColors) {
    svgColors[key] = "#61666D";
  }
};
</script>

<style scoped lang="scss">
.container {
  margin: 20px 100px;
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .container-left {
    width: 61%;
    .video-main {
      height: 650px;
      .video-info {
        height: 15%;
        .info-title {
          padding: 2% 0;
          font-size: 1.6em;
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
      .video-player {
        height: 75%;
        background-color: black;
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
    .video-comment {
      .comment-head {
        height: 100px;
        margin: 30px 0;
        .comment-info {
          display: flex;
          align-items: center;
          .head-left {
            font-size: 1.5em;
            margin-right: 5px;
          }
          .head-num {
            color: #9499a0;
            margin-right: 30px;
          }
          .choosed {
            color: #000;
          }
          .mouse-in {
            color: #06aeec;
          }
          .order-hotest,
          .order-newest {
            color: #9499a0;
            padding: 0 15px;
          }
          .order-hotest {
            border-right: 1px solid #9499a0;
          }
        }
        .comment-publish {
          margin-top: 25px;
          display: flex;
          .avatar-big {
            width: 10%;
          }
          .textarea-and-button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 90%;
          }
        }
      }
    }
  }
  .container-right {
    width: 35%;
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
