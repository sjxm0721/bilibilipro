<template>
  <div class="banner-container">
    <div class="banner-logo">
      <a href="javascript:;">
        <img src="@/assets/images/logo.jpg" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.banner-container {
  position: relative;
  height: 144px;
  padding: 10px;
  background-image: url("@/assets/images/banner.jpg");
  background-size: cover;

  .banner-logo img {
    width: 160px;
    height: 80px;
    left: 48px;
    bottom: 8px;
    position: absolute;
    cursor:pointer;
  }
}
</style>
