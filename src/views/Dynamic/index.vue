<template>
  <div class="dynamic-container">
    <div class="dynamic-bg"></div>
    <DynamicNav />
    <div class="dynamic-body">
      <div class="dynamic-left">
        <div class="box top">
          <div class="user-info-head">
            <img :src="accountStore.myInfo?.avatar" />
            <span>{{ accountStore.myInfo?.accountName }}</span>
          </div>
          <div class="user-info-content">
            <div>
              <div class="info-num">{{ accountStore.myInfo?.followNum }}</div>
              <div class="info-label">关注</div>
            </div>
            <div>
              <div class="info-num">{{ accountStore.myInfo?.fansNum }}</div>
              <div class="info-label">粉丝</div>
            </div>
            <div>
              <div class="info-num">{{ accountStore.myInfo?.dynamicNum }}</div>
              <div class="info-label">动态</div>
            </div>
          </div>
        </div>
      </div>
      <div class="dynamic-center">
        <div class="box top">
          <div class="title-box">分享动态</div>
          <div class="input-box">
            <el-input
              v-model="dynamicPostData.text"
              placeholder="有什么想和大家分享的？"
              type="textarea"
              style="margin: 20px 0 10px"
              rows="2"
              resize="none"
            />
          </div>
          <div class="publish-button">
            <el-button type="primary" size="large" @click="publishDynamic"
              >发布</el-button
            >
          </div>
        </div>
        <div class="box middle-nav">
          <div class="all">
            <div class="nav-icon">
              <def-svg-icon
                svg-name="dynamic"
                svg-height="25px"
                svg-width="25px"
                svg-color="#2FBCEF"
              ></def-svg-icon>
            </div>
            <div style="margin-top: 10px; color: #1296db">动态</div>
          </div>
        </div>
        <div class="dynamic-show">
          <DynamicContent ref="dynamicContent"></DynamicContent>
        </div>
      </div>
      <div class="dynamic-right">
        <div class="box top">
          <div class="banner-image">
            <img src="@/assets/images/dynamicBanner.jpg" />
          </div>
        </div>
        <div class="topic-list box">
          <div class="title">话题</div>
          <div class="topic-container">
            <div class="topic-logo">
              <def-svg-icon svg-name="topic" svg-color="#1296DB"></def-svg-icon>
            </div>
            <div class="main-content">
              <div class="topic-title"><span>五条悟大战两面宿傩</span></div>
              <div class="topic-info">71.7万浏览&nbsp;790讨论</div>
            </div>
          </div>
          <div class="topic-container">
            <div class="topic-logo">
              <def-svg-icon svg-name="topic" svg-color="#1296DB"></def-svg-icon>
            </div>
            <div class="main-content">
              <div class="topic-title"><span>五条悟大战两面宿傩</span></div>
              <div class="topic-info">71.7万浏览&nbsp;790讨论</div>
            </div>
          </div>
          <div class="topic-container">
            <div class="topic-logo">
              <def-svg-icon svg-name="topic" svg-color="#1296DB"></def-svg-icon>
            </div>
            <div class="main-content">
              <div class="topic-title"><span>五条悟大战两面宿傩</span></div>
              <div class="topic-info">71.7万浏览&nbsp;790讨论</div>
            </div>
          </div>
          <div class="topic-container">
            <div class="topic-logo">
              <def-svg-icon svg-name="topic" svg-color="#1296DB"></def-svg-icon>
            </div>
            <div class="main-content">
              <div class="topic-title"><span>五条悟大战两面宿傩</span></div>
              <div class="topic-info">71.7万浏览&nbsp;790讨论</div>
            </div>
          </div>
          <div class="topic-container">
            <div class="topic-logo">
              <def-svg-icon svg-name="topic" svg-color="#1296DB"></def-svg-icon>
            </div>
            <div class="main-content">
              <div class="topic-title"><span>五条悟大战两面宿傩</span></div>
              <div class="topic-info">71.7万浏览&nbsp;790讨论</div>
            </div>
          </div>
          <div class="topic-container">
            <div class="topic-logo">
              <def-svg-icon svg-name="topic" svg-color="#1296DB"></def-svg-icon>
            </div>
            <div class="main-content">
              <div class="topic-title"><span>五条悟大战两面宿傩</span></div>
              <div class="topic-info">71.7万浏览&nbsp;790讨论</div>
            </div>
          </div>
          <div class="topic-container">
            <div class="topic-logo">
              <def-svg-icon svg-name="topic" svg-color="#1296DB"></def-svg-icon>
            </div>
            <div class="main-content">
              <div class="topic-title"><span>五条悟大战两面宿傩</span></div>
              <div class="topic-info">71.7万浏览&nbsp;790讨论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicNav from "../../views/Dynamic/components/DynamicNav.vue";
import DynamicContent from "./components/DynamicContent.vue";
import { useAccountStore } from "@/stores/modules/account";
import { reactive, ref } from "vue";
import type { DynamicPostData } from "@/api/dynamic/type";
import { reqPublishDynamic } from "@/api/dynamic";
import { ElMessage } from "element-plus";

const dynamicContent = ref();

const accountStore = useAccountStore();
const dynamicPostData = reactive<DynamicPostData>({
  uid: accountStore.myInfo?.uid!,
  text: "",
});

const publishDynamic = async () => {
  if (dynamicPostData.text === "") {
    ElMessage({
      type: "error",
      message: "文本内容不能为空",
    });
  } else {
    const res = await reqPublishDynamic(dynamicPostData);
    if (res.code == 200) {
      accountStore.getMyInfo();
      dynamicContent.value!.getDynamicPageInfo(true);
      dynamicPostData.text = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic-container {
  .dynamic-bg {
    position: fixed;
    bottom: 0;
    height: 100vh;
    width: 100%;
    background-image: url("@/assets/images/dynamicBg.jpg");
    background-size: cover;
    z-index: 0;
  }
  .dynamic-body {
    margin-top: 80px;
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    z-index: 1;
    .box {
      background-color: #fff;
      border-radius: 6px;
    }
    .top {
      height: 160px;
      border-bottom: 8px;
      width: 100%;
      padding: 20px 16px;
      position: relative;
      margin-bottom: 10px;
    }
    .dynamic-left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
      }
      width: 18%;
      height: 3000px;
      margin-right: 15px;

      .user-info-head {
        display: flex;
        align-items: center;
        span {
          margin-left: 15px;
          font-size: 1.2em;
          cursor: pointer;
          color: #fb7299;
        }
      }
      .user-info-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        & > div {
          cursor: pointer;
          text-align: center;
          .info-num {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .info-label {
            color: #9499a0;
          }
        }
      }
    }
    .dynamic-center {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
      }
      width: 52%;
      .title-box {
        font-size: 1.3em;
      }
      .publish-button {
        position: absolute;
        right: 15px;
        bottom: 5px;
      }

      .middle-nav {
        padding: 0 15px;
        height: 120px;
        display: flex;
        align-items: center;
        text-align: center;
        .nav-icon {
          cursor: pointer;
          display: inline-block;
          padding: 14px;
          border-radius: 50%;
          background-color: #dff6fd;
          border: 1px solid #06aeec;
        }
      }
    }
    .dynamic-right {
      width: 25%;
      margin-left: 15px;
      .top {
        padding: 0;
        overflow: hidden;
        .banner-image {
          height: 100%;
          width: 100%;
          img {
            cursor: pointer;
            overflow-clip-margin: content-box;
            overflow: clip;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: inherit;
          }
        }
      }
      .topic-list {
        padding: 20px;
        .title {
          font-size: 1.3em;
          font-weight: 700;
          padding: 10px;
        }
        .topic-container {
          cursor: pointer;
          height: 63px;
          display: flex;
          justify-content: space-between;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 15px;
          &:hover {
            background-color: rgb(240, 240, 240);
          }
          .topic-logo {
            width: 12%;
          }
          .main-content {
            width: 84%;
            .topic-title > span:hover {
              color: #1296db;
            }
            .topic-info {
              margin-top: 10px;
              color: #9499a0;
            }
          }
        }
      }
    }
  }
}
</style>
