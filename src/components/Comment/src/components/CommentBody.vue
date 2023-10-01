<template>
  <div class="comment-body-container">
    <div class="avatar-big">
      <img src="@/assets/images/avatar.jpg" />
    </div>
    <div class="comment-main">
      <div class="user-info">
        <span>穿毛裤的小拉泽</span>
      </div>
      <div class="root-replay">
        <div class="reply-container">
          家里的登陆为大家挖打卡为大家挖了多久挖来打卡我觉得拉到今晚拉开多久啊我的啦我看见的例外哦诶钱我陪u请问i欧恶趣味哦i请问u请问u都忘了打我的为大家挖了到我家阿德莱德就挖了多久啊我的就挖了到裤袜到了我就都忘了丢饿哦确切我饿u请问u请问看进去了就去玩了快去为两块钱
        </div>
        <div class="reply-info">
            2023-09-30 16:50
            &nbsp;&nbsp;&nbsp;
            <def-svg-icon svg-name="likeLight" svg-color="#9499a0"></def-svg-icon> 233
            &nbsp;&nbsp;&nbsp;
            <def-svg-icon svg-name="unlikeLight" svg-color="#9499a0"></def-svg-icon>
            &nbsp;&nbsp;&nbsp;
            回复
        </div>
      </div>
      <div class="reply-list">
        <ReplyList></ReplyList>
        <ReplyList></ReplyList>
        <ReplyList></ReplyList>
        <ReplyList></ReplyList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReplyList from './ReplyList.vue';
</script>

<style scoped lang="scss">
.comment-body-container {
  display: flex;
  margin-top: 20px;

  .avatar-big {
    width: 10%;
    img {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .comment-main {
    width: 90%;
    padding: 10px;
    border-bottom: 1px solid #9499a0;
    .user-info {
      margin: 5px 0;
      font-weight: 500;
      color:#61666D;
      & span:hover {
        cursor: pointer;
        color: #06aeec;
      }
    }
    .reply-container {
      padding: 5px 0;
      font-size: 1.1em;
      line-height: 1.8em;
    }
    .reply-info{
        color:#9499a0;
    }
    .reply-list{
      overflow: hidden;
    }
  }
}
</style>
