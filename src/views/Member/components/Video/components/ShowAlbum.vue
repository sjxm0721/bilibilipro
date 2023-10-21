<template>
  <div class="show-album-container">
    <div class="right-album">
      <div class="album-nav">
        <span class="label">我的相簿</span>
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
      <div class="album-body">
        <div class="body-empty">
          <img src="@/assets/images/empty.jpg" />
          <div>该空间主人还未发表相簿内容</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const choosedOrder = ref(0);

const changeOrder = (order: number) => {
  choosedOrder.value = order;
};
</script>

<style scoped lang="scss">
.show-album-container {
  .label {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #1296db;
    }
  }
  .right-album {
    .album-body {
      max-height: 520px;
      margin-top: 20px;
      // display: grid;
      // grid-template-columns: 18% 18% 18% 18% 18%;
      // grid-column-gap: 2%;
      // overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .album {
        margin-bottom: 20px;
        font-size: 11px;
      }
      .body-empty{
        text-align: center;
        color:#6C757A;
      }
    }
    .album-nav {
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
