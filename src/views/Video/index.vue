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
        <div class="video-player"></div>
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
    </div>
    <div class="container-right"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const svgColors: any = reactive({
  like: "#61666D",
  coin: "#61666D",
  collectionSolid: "#61666D",
});

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
  .container-left {
    // flex-grow: 2;
    width: 64%;
    // margin-right: 5%;
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
        color:rgba($color: #000, $alpha: 0.8);
        font-size: 1.2em;
        line-height: 1.5em;
      }
      .video-tags {
        margin-top: 10px;

        .video-tag{
            display: inline-block;margin: 0 8px 16px 0;
        }
      }
    }
  }
  .container-right {
    // flex-grow: 1;
    width: 32%;
    background-color: blue;
  }
}
</style>
