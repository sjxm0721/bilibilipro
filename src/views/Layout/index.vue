<template>
  <div class="container">
    <LayoutFixed/>
    <router-view></router-view>
    <LayoutFooter />
    <Login/>
    <el-backtop :right="10" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import LayoutFixed from "./components/LayoutFixed.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import Login from "./components/Login.vue";
</script>

<style scoped lang="scss"></style>
