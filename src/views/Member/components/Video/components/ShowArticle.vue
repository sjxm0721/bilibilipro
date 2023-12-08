<template>
  <div class="show-article-container">
    <div class="right-article">
      <div class="article-nav">
        <span class="label">{{ accountStore.myInfo?.uid===memberStore.memberInfo?.uid?'我的专栏':'TA的专栏' }}</span>
        <div
          class="order-type"
          @click="changeOrder(0)"
          :class="{ choosed: choosedOrder === 0 }"
        >
          最新发布
        </div>
        <div
          class="order-type"
          @click="changeOrder(1)"
          :class="{ choosed: choosedOrder === 1 }"
        >
          最多点击
        </div>
        <div
          class="order-type"
          @click="changeOrder(2)"
          :class="{ choosed: choosedOrder === 2 }"
        >
          最多收藏
        </div>
      </div>
      <div class="article-body">
        <div class="body-empty">
          <img src="https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/empty.jpg" />
          <div>该空间主人还未发表专栏内容</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useAccountStore} from '@/stores/modules/account'
import { useMemberStore } from "@/stores/modules/member";

const accountStore = useAccountStore()
const memberStore = useMemberStore()

const choosedOrder = ref(0);

const changeOrder = (order: number) => {
  choosedOrder.value = order;
};
</script>

<style scoped lang="scss">
.show-article-container {
  .label {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #1296db;
    }
  }
  .right-article {
    .article-body {
      max-height: 520px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .article {
        margin-bottom: 20px;
        font-size: 11px;
      }
      .body-empty{
        text-align: center;
        color:#6C757A;
      }
    }
    .article-nav {
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
    }
  }
}
</style>
