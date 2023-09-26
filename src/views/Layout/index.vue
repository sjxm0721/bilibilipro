<template>
  <div class="container">
    <LayoutFixed :key="$route.fullPath" />
    <router-view></router-view>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import LayoutFixed from "./components/LayoutFixed.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
</script>

<style scoped lang="scss"></style>
