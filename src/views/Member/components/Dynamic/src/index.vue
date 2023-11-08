<template>
  <div class="member-dynamic-container">
    <div class="left-show">
      <MemberDynamicContent></MemberDynamicContent>
    </div>
    <div class="right-info">
      <div style="margin: 20px">个人资料</div>
      <div class="personal-info">
        <div>UID&nbsp;11451411037</div>
        <div>生日&nbsp;07-21</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MemberDynamicContent from './MemberDynamicContent.vue';
// import { useRoute } from 'vue-router';
// const route = useRoute()
// console.log(route.params.uid)


</script>

<style scoped lang="scss">
.member-dynamic-container {
    display: flex;
    justify-content: space-between;
  .left-show {
    width: 66%;
    .box {
      background-color: #fff;
      border-radius: 6px;
    }
    .dynamic-content {
      font-size: 18px;
      margin-bottom: 10px;
      padding: 15px;
      background-color: #fff;
    }
  }

  .right-info {
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
