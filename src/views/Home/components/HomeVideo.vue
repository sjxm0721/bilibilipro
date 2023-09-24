<template>
  <div style="margin:50px 20px;">
    <div class="container">
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
      <div class="video">
        <def-video-item></def-video-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto;
  grid-template-columns: 23% 23% 23% 23%;
  justify-content: space-between;
  .video {
    margin-bottom: 20%;
    display: flex;
    height: 240px;
  }
}
</style>