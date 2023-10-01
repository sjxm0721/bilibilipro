<template>
  <div class="reply-list-container">
    <div class="avatar-small">
      <img src="@/assets/images/amane.jpg" />
    </div>
    <div class="reply-content">
      <span class="user-name">四季夏目天下第一</span>&nbsp;&nbsp;&nbsp;
      <span style="font-size: 1.1em"
        >
        四季夏目0721
        </span
      >
      <div class="reply-info">
        2023-09-30 16:50 &nbsp;&nbsp;&nbsp;
        <def-svg-icon svg-name="likeLight" svg-color="#9499a0"></def-svg-icon>
        233 &nbsp;&nbsp;&nbsp;
        <def-svg-icon svg-name="unlikeLight" svg-color="#9499a0"></def-svg-icon>
        &nbsp;&nbsp;&nbsp; 回复
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.reply-list-container {
  margin: 10px 0;
  display: flex;
  .avatar-small {
    width: 40px;
    img {
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .reply-content {
    width: calc(100% - 40px);
    line-height: 1.8em;
    .user-name {
      cursor: pointer;
      font-size: 0.9em;
      font-weight: 500;
      color: #61666d;
      &:hover {
        color: #06aeec;
      }
    }
    .reply-info {
      color: #9499a0;
    }
  }
}
</style>
