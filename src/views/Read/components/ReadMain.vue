<template>
  <div class="read-main-container">
    <div class="main">
      <div class="left">
        <ReadLeft></ReadLeft>
      </div>
      <div class="right">
        <ReadRight></ReadRight>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReadLeft from "./ReadLeft.vue";
import ReadRight from "./ReadRight.vue";
</script>

<style lang="scss" scoped>
.read-main-container {
  width: 100%;
  .main {
    display: flex;
    justify-content: space-around;
    .left {
      width: 75%;
    }
    .right {
      width: 25%;
    }
  }
}
</style>
