<template>
  <div class="fzf-container">
    <fzfNav></fzfNav>
    <div class="fzf-body-container">
        <fzfMain></fzfMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import fzfNav from "@/views/404/components/fzfNav.vue";
import fzfMain from "@/views/404/components/fzfMain.vue";
</script>

<style scoped lang="scss">
.fzf-container {
  .fzf-body-container {
    width: 100%;
    margin-top: 70px;
    height: calc(100vh - 70px);
    background-color: #f4f5f7;
  }
}
</style>
