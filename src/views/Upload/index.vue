<template>
  <div class="upload-container">
    <UploadNav></UploadNav>
    <div class="upload-body-container">
      <UploadMain></UploadMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadNav from "@/views/Upload/components/UploadNav.vue";
import UploadMain from "@/views/Upload/components/UploadMain.vue";
</script>

<style scoped lang="scss">
.upload-container {
  .upload-body-container {
    width: 100%;
    margin-top: 70px;
    height: calc(100vh - 70px);
    background-color: #f4f5f7;
  }
}
</style>
