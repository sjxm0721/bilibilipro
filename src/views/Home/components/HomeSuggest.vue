<template>
  <div class="container">
    <!-- <def-video-item></def-video-item> -->
    <div class="item" v-for="item in hots" :key="item.id">
      <def-video-item
        :item-picture="item.itemPicture"
        :click-num="item.clickNum"
        :barrage-num="item.barrageNum"
        :video-time="item.videoTime"
        :title="item.title"
        :author="item.author"
        :post-time="item.postTime"
      ></def-video-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const hots = ref([
  {
    id: 1,
    itemPicture: "../../../../src/assets/images/amane.jpg",
    clickNum: 20,
    barrageNum: 10,
    videoTime: "07:21",
    title: "一起来看枣子姐转世谷风天音0721，杂古杂古～",
    author: "四季夏目",
    postTime: "2023-9-11",
  },
  {
    id: 2,
    itemPicture: "../../../../src/assets/images/tk.jpg",
    clickNum: 22,
    barrageNum: 1,
    videoTime: "111:29",
    title: "抖m远子大小姐XX视频意外流出",
    author: "不知出家的下流女仆",
    postTime: "1922-2-22",
  },
  {
    id: 3,
    itemPicture: "../../../../src/assets/images/jiaozhu.jpg",
    clickNum: 1000,
    barrageNum: 101,
    videoTime: "07:33",
    title: "美好的每一天～不连续的存在",
    author: "江户川柯南",
    postTime: "2023-9-12",
  },
  {
    id: 4,
    itemPicture: "../../../../src/assets/images/nagisa.jpg",
    clickNum: 2001,
    barrageNum: 5,
    videoTime: "11.22",
    title: "请不要后悔与我相遇",
    author: "古河渚",
    postTime: "2023-10-11",
  },
]);
</script>

<style lang="scss" scoped>
.container {
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;

  .item {
    width: 48%;
    height: 48%;
    border-radius: 10px;
  }
}
</style>
