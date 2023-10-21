<template>
  <div class="fav-list-container">
    <div class="top-poster">
      <img src="@/assets/images/nagisa.jpg" />
      <span class="fav-count">114</span>
    </div>
    <div class="bottom-info">
      <div class="info-left"><span>默认收藏夹</span></div>
      <div class="info-right">公开</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.fav-list-container {
  margin-top: 20px;
  width:160px;
  height:200px;
  .top-poster {
    width: 152px;
    height: 152px;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid #ccd0d7;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .fav-count {
      position: absolute;
      top: 10px;
      right: 10px;
      min-width: 12px;
      padding: 0 9px;
      line-height: 18px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 9px;
      color: #fff;
    }
  }
  .bottom-info {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    .info-left {
        width:70%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      & > span {
        cursor: pointer;
        font-size: 1.3em;
        &:hover {
          color: #06aeec;
        }
      }
    }
    .info-right {
      width:20%;
      font-size: 0.9em;
      color: #99a2aa;
    }
  }
}
</style>
