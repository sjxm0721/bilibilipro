<template>
  <div class="comment-body-container">
    <div class="comment-more" v-show="deleteable">
      <el-dropdown :hide-on-click="false">
        <def-svg-icon
          svg-name="more"
          svg-color="#707070"
          style="cursor: pointer"
          svg-width="24px"
          svg-height="24px"
        ></def-svg-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-popconfirm width="200" title="删除时默认同时删除所有子评论，确认删除吗？" @confirm="deleteComment">
                <template #reference>
                  <span>删除评论</span>
                </template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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
          <span :style="{ color: isLiked ? '#06aeec' : '#9499A0' }"
            ><def-svg-icon
              @mouseover="changeSvgColor"
              @mouseleave="svgColorReturn"
              @click="clickLike(isLiked)"
              style="cursor: pointer"
              svg-name="likeLight"
              :svg-color="svgColor === true || isLiked ? '#06AEEC' : '#9499A0'"
            ></def-svg-icon>
            {{ commentData.likeNum }}</span
          >
          &nbsp;&nbsp;&nbsp;
          <span>
            <def-svg-icon
              svg-name="unlikeLight"
              svg-color="#9499a0"
            ></def-svg-icon>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span
            class="reply-button"
            @click="
              clickReplyButton(commentData.commentId, commentData.accountName)
            "
            >回复</span
          >
        </div>
      </div>
      <div
        class="reply-list"
        v-if="commentData.subComment"
        v-for="item in commentData.subComment"
        :key="item.commentId"
      >
        <ReplyList
          :replyData="item"
          :clickReplyButton="clickReplyButton"
          :refreshCommentList="refreshCommentList"
        ></ReplyList>
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
          <el-button type="info" size="large" @click="cancelReply"
            >取消</el-button
          >
          <el-button type="primary" size="large" @click="publishChildrenComment"
            >回复</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqReplyComment,reqDeleteComment } from "@/api/comment";
import ReplyList from "./ReplyList.vue";
import type { CommentData, ReplyCommentInfo } from "@/api/comment/type";
import { useAccountStore } from "@/stores/modules/account";
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { throttle } from "lodash";
import type { LikePostData } from "@/api/like/type";
import { useLikeStore } from "@/stores/modules/like";
import { reqAddLike, reqCancelLike } from "@/api/like";
import { useMemberStore } from "@/stores/modules/member";
import type{message} from '@/utils/websocketClass'
import { useWebSocketStore } from "@/stores/modules/websocket";

const websocketStore = useWebSocketStore()
const memberStore = useMemberStore();
const likeStore = useLikeStore();
const accountStore = useAccountStore();
const account = accountStore.myInfo;
const props = defineProps<{
  commentData: CommentData;
  refreshCommentList: Function;
  refreshDeletedCommentList:Function
}>();

const svgColor = ref<boolean>(false);

const changeSvgColor = () => {
  svgColor.value = true;
};

const svgColorReturn = () => {
  svgColor.value = false;
};

const showInput = ref(false);
let replyCommentInfo = reactive<ReplyCommentInfo>({
  uid: account?.uid as number,
  content: "",
  fatherId: undefined,
  totalFatherId: props.commentData.commentId,
});

const clickReplyButton = (commentId: number, accountName: string) => {
  replyCommentInfo.fatherId = commentId;
  replyCommentInfo.accountName = accountName;
  showInput.value = true;
};

const clearRCInfo = () => {
  replyCommentInfo.content = "";
  replyCommentInfo.fatherId = undefined;
};

const cancelReply = () => {
  clearRCInfo();
  showInput.value = false;
};

//发表子评论
const publishChildrenComment = async () => {
  await reqReplyComment(replyCommentInfo)
    .then(() => {
      ElMessage({
        type: "success",
        message: "发表评论成功",
      });
      clearRCInfo();
      props.refreshCommentList(replyCommentInfo.totalFatherId);
      showInput.value = false;
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "发表评论失败",
      });
    });
};


//点赞相关
const likeMessage = reactive<message>({
  isSystem:"0",
  fromUid:account?.uid,
  toUid:props.commentData.uid,
  isAll:false,
  type:"1",
  commentId:props.commentData.commentId
})
let isLiked = computed(() => {
  return likeStore.commentLikeList.some((likeList) => {
    return (
      likeList.commentId === props.commentData.commentId &&
      likeList.status === "0"
    );
  });
});
const clickLike = throttle(async (status: boolean) => {
  let likePostData: LikePostData = {
    fromUid: account?.uid!,
    toUid: props.commentData.uid,
    type: "2",
    commentId: props.commentData.commentId,
    status: status === true ? "1" : "0",
  };
  if (status === true) {
    //点赞状态
    const res = await reqCancelLike(likePostData);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "取消点赞成功",
      });
      likeStore.getLikeList(account?.uid!, "2").then(() => {
        if (memberStore.memberInfo !== null) {
          if (memberStore.memberInfo.uid === props.commentData.uid) {
            memberStore.getMemberInfo(props.commentData.uid);
          }
        }
        props.refreshCommentList(props.commentData.commentId);
      });
    } else {
      ElMessage({
        type: "error",
        message: "取消点赞失败",
      });
    }
  } else {
    //非点赞状态
    const res = await reqAddLike(likePostData);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "点赞成功",
      });
      websocketStore.sendMessage(JSON.stringify(likeMessage))
      likeStore.getLikeList(account?.uid!, "2").then(() => {
        console.log(memberStore.memberInfo?.uid, props.commentData.uid);
        if (memberStore.memberInfo !== null) {
          if (memberStore.memberInfo.uid === props.commentData.uid) {
            memberStore.getMemberInfo(props.commentData.uid);
          }
        }
        props.refreshCommentList(props.commentData.commentId);
      });
    } else {
      ElMessage({
        type: "error",
        message: "点赞失败",
      });
    }
  }
}, 300);

const deleteable = computed(() => {
  if (props.commentData.uid === account?.uid) {
    return true;
  }
  return false;
});

const deleteComment = async ()=>{
  const res = await reqDeleteComment(props.commentData.commentId);
  if(res.code === 200){
    props.refreshDeletedCommentList(props.commentData.commentId)
    
  }
}
</script>

<style scoped lang="scss">
.comment-body-container {
  display: flex;
  margin-top: 20px;
  position: relative;
  .comment-more {
    position: absolute;
    top: 10px;
    right: 0;
  }
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
    border-bottom: 1px solid #e3e5e7;
    .user-info {
      margin: 5px 0;
      font-weight: 500;
      color: #61666d;
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
    .reply-info {
      color: #9499a0;
      .reply-button {
        cursor: pointer;
        &:hover {
          color: #06aeec;
        }
      }
    }
    .reply-list {
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
