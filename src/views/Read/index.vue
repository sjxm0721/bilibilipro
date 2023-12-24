<template>
  <ReadNav></ReadNav>
  <div class="read-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ReadNav from "@/views/Read/components/ReadNav.vue";
</script>

<style lang="scss" scoped>
.read-container {
  width: 100%;
  height: calc(100vh - 70px);
  margin: 70px auto 0;
}
</style>
