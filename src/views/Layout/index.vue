<template>
  <div class="container">
    <LayoutNav />
    <LayoutFixed />
    <router-view></router-view>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import LayoutNav from "./components/LayoutNav.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
</script>

<style scoped lang="scss">
</style>
