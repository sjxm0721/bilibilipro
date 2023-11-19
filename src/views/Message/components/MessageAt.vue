<template>
  <div class="at-container">
    <div class="nothing">
      <img src="@/assets/images/empty.jpg" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.at-container {
  background-color: #fff;
  border-radius: 5px;
  .nothing {
    height: 256px;
    width: 100%;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
