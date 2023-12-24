<template>
  <div class="read-left-main">
    <div class="nav" :class="[{ scroll: y > 50 }]">
      <div class="header-logo">
        <img src="../../../assets/pics/read.png" />
      </div>
      <div class="main-content">
        <div class="nav-body" @click="changeCategory(0)">
          <def-svg-icon
            svg-name="readSuggest"
            svg-height="28px"
            svg-width="28px"
            :svg-color="articleStore.categoryCenter === 0 ? '#00A1D6' : '#000'"
          ></def-svg-icon>
          <span
            class="nav-font"
            :style="{ color: articleStore.categoryCenter === 0 ? '#00A1D6' : '#8e8e8e' }"
            >推荐</span
          >
        </div>
        <div class="nav-body" @click="changeCategory(1)">
          <def-svg-icon
            svg-name="anime"
            svg-height="28px"
            svg-width="28px"
            :svg-color="articleStore.categoryCenter === 1 ? '#00A1D6' : '#000'"
          ></def-svg-icon>
          <span
            class="nav-font"
            :style="{ color: articleStore.categoryCenter === 1 ? '#00A1D6' : '#8e8e8e' }"
            >动画</span
          >
        </div>
        <div class="nav-body" @click="changeCategory(2)">
          <def-svg-icon
            svg-name="game"
            svg-height="28px"
            svg-width="28px"
            :svg-color="articleStore.categoryCenter === 2 ? '#00A1D6' : '#000'"
          ></def-svg-icon>
          <span
            class="nav-font"
            :style="{ color: articleStore.categoryCenter === 2 ? '#00A1D6' : '#8e8e8e' }"
            >游戏</span
          >
        </div>
        <div class="nav-body" @click="changeCategory(3)">
          <def-svg-icon
            svg-name="movie"
            svg-height="28px"
            svg-width="28px"
            :svg-color="articleStore.categoryCenter === 3 ? '#00A1D6' : '#000'"
          ></def-svg-icon>
          <span
            class="nav-font"
            :style="{ color: articleStore.categoryCenter === 3 ? '#00A1D6' : '#8e8e8e' }"
            >影视</span
          >
        </div>
        <div class="nav-body" @click="changeCategory(4)">
          <def-svg-icon
            svg-name="life"
            svg-height="28px"
            svg-width="28px"
            :svg-color="articleStore.categoryCenter === 4 ? '#00A1D6' : '#000'"
          ></def-svg-icon>
          <span
            class="nav-font"
            :style="{ color: articleStore.categoryCenter === 4 ? '#00A1D6' : '#8e8e8e' }"
            >生活</span
          >
        </div>
        <div class="nav-body" @click="changeCategory(5)">
          <def-svg-icon
            svg-name="science"
            svg-height="28px"
            svg-width="28px"
            :svg-color="articleStore.categoryCenter === 5 ? '#00A1D6' : '#000'"
          ></def-svg-icon>
          <span
            class="nav-font"
            :style="{ color: articleStore.categoryCenter === 5 ? '#00A1D6' : '#8e8e8e' }"
            >科技</span
          >
        </div>
        <div class="nav-body" @click="changeCategory(6)">
          <def-svg-icon
            svg-name="note"
            svg-height="28px"
            svg-width="28px"
            :svg-color="articleStore.categoryCenter === 6 ? '#00A1D6' : '#000'"
          ></def-svg-icon>
          <span
            class="nav-font"
            :style="{ color: articleStore.categoryCenter === 6 ? '#00A1D6' : '#8e8e8e' }"
            >笔记</span
          >
        </div>
      </div>
    </div>
    <div class="center">
      <ReadCenter />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReadCenter from "./ReadCenter.vue";
import { useScroll } from "@vueuse/core";
import { useArticleStore } from "@/stores/modules/article";
const { y } = useScroll(window);
const articleStore = useArticleStore();

const changeCategory = (index: number) => {
  articleStore.categoryCenter = index;
};



</script>

<style lang="scss" scoped>
.read-left-main {
  display: flex;
  .scroll {
    transform: translateY(-50px);
    transition: 0.2s;
  }
  .nav {
    position: fixed;
    width: 238px;
    padding: 20px;
    .header-logo {
      margin: 0 auto;
      height: 30px;
      width: 120px;
      object-fit: contain;
    }
    .main-content {
      .nav-body {
        &:hover {
          cursor: pointer;
          & .nav-font {
            color: #00a1d6;
          }
        }
        height: 30px;
        width: 110px;
        line-height: 30px;
        margin: 0 auto;
        margin-top: 35px;
        .nav-font {
          font-size: 15px;
          padding-left: 30px;
        }
      }
    }
  }
  .center {
    margin-left: 238px;
    width: 752px;
  }
}
</style>
