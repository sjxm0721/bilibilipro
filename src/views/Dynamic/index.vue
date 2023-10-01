<template>
  <div class="dynamic-container">
    <div class="dynamic-bg"></div>
    <DynamicNav/>
    <div class="dynamic-body">
      <div class="dynamic-left">hello</div>
      <div class="dynamic-center"></div>
      <div class="dynamic-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicNav from '@/views/Dynamic/components/DynamicNav.vue'
</script>

<style lang="scss" scoped>
.dynamic-container {
  .dynamic-bg {
    position:fixed;
    bottom:0;
    height: 100vh;
    width: 100%;
    background-image: url("@/assets/images/dynamicBg.jpg");
    background-size: cover;
    z-index:0;
  }
  .dynamic-body {
    margin-top:70px;
    width:100%;
    display:flex;
    position:relative;
    justify-content:center;
    z-index:1;
    .dynamic-left {
        width:15%;
        background-color:red;
      height: 3000px;
    }
    .dynamic-center {
        width:40%;
        background-color:yellow;
    }
    .dynamic-right {
        width:15%;
        background-color:blue;
    }
  }
}
</style>
