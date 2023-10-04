<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="image in images" :key="image">
      <div class="carousel-container">
        <img :src="image" />
        <div class="info"></div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { ref } from "vue";

const images = ref([
  "../../../../src/assets/images/by.jpg",
  "../../../../src/assets/images/ou.jpg",
  "../../../../src/assets/images/ao.jpg",
  "../../../../src/assets/images/wds.jpg",
  "../../../../src/assets/images/mkm.jpg",
]);
</script>
<style scoped lang="scss">
:deep().el-carousel__container {
  height: 400px;
}

:deep().el-carousel__indicator--horizontal .el-carousel__button {
  width: 15px;
  height: 10px;
  background: #f2f2f2;
  border: 1px solid #ffffff;
  border-radius: 50px;
  opacity: 0.8;
  border: none !important;
}
:deep().el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 30px;
  height: 10px;
  background: #fff;
  border-radius: 40px;
  border: none !important;
  opacity: 1;
}
:deep().el-carousel__indicators--horizontal {
  position: relative;
  bottom: 30px;
  left: 52%;
}

:deep() .el-carousel__arrow--left{
  left: 80%;
}

:deep() .el-carousel__arrow{
  top:90%;
}

.el-carousel__item {
  .carousel-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    img {
      height: 100%;
      object-fit: cover; 
    }
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 999;
      height: 20%;
      width: 100%;
      background-color: rgba($color: #fff, $alpha: 0.2);
    }
  }
}
</style>
