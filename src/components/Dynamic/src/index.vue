<template>
  <div class="dynamic-component">
    <div class="avatar">
      <img src="@/assets/images/avatar.jpg" />
    </div>
    <div class="main-content">
      <div><span class="user">吃肉的绵羊</span></div>
      <div class="publish-time">2023-10-04 11:20:59</div>
      <div class="dynamic-body">
        <div class="type-word">
          我投稿了一个视频，快来围观吧！
          djlwadjawldjawlkdjwadlkjdl家里的挖就到啦我多久啊来我的恐惧啊我离开多久外u去我饿企鹅u去哦额u去哦为i鹅u去
        </div>
        <div class="type-video" v-show="true">
          <def-video-dynamic-item></def-video-dynamic-item>
        </div>
      </div>
      <div class="user-operation">
        <div class="operation">
          <def-svg-icon svg-name="forward" svg-color="#99A2AA"></def-svg-icon>
          <span>0</span>
        </div>
        <div class="operation">
          <def-svg-icon svg-name="comment" svg-color="#99A2AA"></def-svg-icon>
          <span>0</span>
        </div>
        <div class="operation">
          <def-svg-icon svg-name="likeLight" svg-color="#99A2AA"></def-svg-icon>
          <span>0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dynamic-component {
  display: flex;
  font-size:1em;
  .avatar {
    width: 14%;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .main-content {
    font-size: 1em;
    width: 86%;
    .user {
      cursor: pointer;
      font-size: 1.1em;
      line-height: 1.2em;
      color: #ff6699;
    }
    .publish-time {
      font-size: 0.9em;
      line-height: 1.2em;
      color: #99a2aa;
    }
    .dynamic-body {
      font-size: 1em;
      margin: 10px 0px;
      .type-word {
        line-height: 1.5em;
        margin-bottom: 15px;
      }
      .type-video {
        font-size: 1em;
        border: 1px solid #e3e5e7;
        border-radius: 6px;
      }
    }
    .user-operation {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      font-size: 1em;
      .operation {
        cursor: pointer;
        svg {
          margin-right: 5px;
        }
        span {
          color: #99a2aa;
        }
      }
    }
  }
}
</style>
