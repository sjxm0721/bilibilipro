<template>
  <div class="comment-body-container">
    <div class="avatar-big">
      <img :src="commentData.avatar" />
    </div>
    <div class="comment-main">
      <div class="user-info">
        <span>{{ commentData.accountName }}</span>
      </div>
      <div class="root-replay">
        <div class="reply-container">
          {{ commentData.content }}
        </div>
        <div class="reply-info">
            {{ commentData.postTime }}
            &nbsp;&nbsp;&nbsp;
            <def-svg-icon svg-name="likeLight" svg-color="#9499a0"></def-svg-icon> {{ commentData.likeNum }}
            &nbsp;&nbsp;&nbsp;
            <def-svg-icon svg-name="unlikeLight" svg-color="#9499a0"></def-svg-icon>
            &nbsp;&nbsp;&nbsp;
            <span class="reply-button" @click="clickReplyButton(commentData.commentId,commentData.accountName)">回复</span> 
        </div>
      </div>
      <div class="reply-list" v-if="commentData.subComment" v-for="(item) in commentData.subComment" :key="item.commentId">
        <ReplyList :replyData="item" :clickReplyButton="clickReplyButton"></ReplyList>
      </div>
      <div class="comment-publish" v-if="showInput">
        <div class="avatar-big">
          <img :src="account?.avatar" />
        </div>
        <div class="textarea-and-button">
          <el-input
            v-model="replyCommentInfo.content"
            :rows="2"
            type="input"
            :placeholder="`回复 @${replyCommentInfo.accountName}:`"
            style="width: 70%"
            size="large"
          />
          <el-button type="info" size="large" @click="cancelReply">取消</el-button>
          <el-button type="primary" size="large" @click="publishChildrenComment">回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqReplyComment } from '@/api/comment';
import ReplyList from './ReplyList.vue';
import type {CommentData, ReplyCommentInfo} from '@/api/comment/type'
import { useAccountStore } from '@/stores/modules/account'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';


const accountStore = useAccountStore()
const account = accountStore.myInfo
const props = defineProps<{commentData:CommentData,refreshCommentList:Function}>()

const showInput = ref(false)
let replyCommentInfo=reactive<ReplyCommentInfo>({
    uid:account?.uid as number,
    content:'',
    fatherId:undefined,
    totalFatherId:props.commentData.commentId
})

const clickReplyButton = (commentId:number,accountName:string)=>{
  replyCommentInfo.fatherId=commentId
  replyCommentInfo.accountName = accountName
  showInput.value = true
}

const clearRCInfo = ()=>{
  replyCommentInfo.content = ''
  replyCommentInfo.fatherId = undefined
}

const cancelReply = ()=>{
  clearRCInfo()
  showInput.value = false
}


//发表子评论
const publishChildrenComment = async ()=>{
  await reqReplyComment(replyCommentInfo)
  .then(()=>{
    ElMessage({
      type:'success',
      message:'发表评论成功'
    })
    clearRCInfo()
    props.refreshCommentList(replyCommentInfo.totalFatherId)
    showInput.value = false
  })
  .catch(()=>{
    ElMessage({
      type:'error',
      message:'发表评论失败'
    })
  })
}



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
    border-bottom: 1px solid #E3E5E7;
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
        .reply-button{
          cursor: pointer;
          &:hover{
            color:#06AEEC;
          }
        }
    }
    .reply-list{
      overflow: hidden;
    }
    .comment-publish {
      margin-top: 25px;
      display: flex;
      .avatar-big {
        width: 10%;
      }
      .textarea-and-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
      }
    }
  }
}
</style>
