<template>
  <div class="reply-list-container">
    <div class="reply-more" v-show="deleteable">
      <el-dropdown :hide-on-click="false">
        <def-svg-icon
          svg-name="more"
          svg-color="#707070"
          style="cursor: pointer"
          svg-width="18px"
          svg-height="18px"
        ></def-svg-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-popconfirm width="200" title="删除时默认同时删除所有回复，确认删除吗？" @confirm="deleteComment">
                <template #reference>
                  <span>删除评论</span>
                </template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="avatar-small">
      <img :src="replyData.avatar" @click="toMember"/>
    </div>
    <div class="reply-content">
      <span class="user-name" @click="toMember">{{ replyData.accountName }}</span
      >&nbsp;&nbsp;
      <span v-if="replyData.responseName"
        >回复&nbsp;&nbsp;<span class="response-name">{{
          replyData.responseName
        }}</span
        >&nbsp;&nbsp;&nbsp;
      </span>
      <span style="font-size: 1.1em">
        {{ replyData.content }}
      </span>
      <div class="reply-info">
        {{ replyData.postTime }} &nbsp;&nbsp;&nbsp;
        <span class="like-span" :style="{ color: isLiked ? '#06aeec' : '#9499A0' }">
          <def-svg-icon
            @mouseover="changeSvgColor"
            @mouseleave="svgColorReturn"
            @click="clickLike(isLiked)"
            style="cursor: pointer"
            svg-name="likeLight"
            :svg-color="svgColor === true ||isLiked ? '#06AEEC' : '#9499A0'"
          ></def-svg-icon>
          {{ replyData.likeNum }}
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <def-svg-icon svg-name="unlikeLight" svg-color="#9499a0"></def-svg-icon>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span
          class="reply-button"
          @click="clickReplyButton(replyData.commentId,replyData.uid,replyData.accountName)"
          >回复</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentData } from "@/api/comment/type";
import { ref,computed,reactive } from "vue";
import { ElMessage } from "element-plus";
import { throttle } from "lodash";
import { useAccountStore } from "@/stores/modules/account";
import { useLikeStore } from "@/stores/modules/like";
import type { LikePostData } from "@/api/like/type";
import { reqAddLike,reqCancelLike } from "@/api/like";
import { useMemberStore } from "@/stores/modules/member";
import { reqDeleteComment } from "@/api/comment";
import type{message} from '@/utils/websocketClass'
import { useWebSocketStore } from "@/stores/modules/websocket";
import { useRouter } from "vue-router";

const websocketStore = useWebSocketStore()
const likeStore = useLikeStore()
const account = useAccountStore().myInfo
const props = defineProps<{ replyData: CommentData; clickReplyButton: Function ;refreshCommentList:Function}>();
const svgColor = ref<boolean>(false);
const memberStore = useMemberStore()
const router = useRouter()

const changeSvgColor = () => {
  svgColor.value = true;
};

const svgColorReturn = () => {
  svgColor.value = false;
};

//点赞按钮的回调
const likeMessage = reactive<message>({
  isSystem:"0",
  fromUid:account?.uid,
  toUid:props.replyData.uid,
  isAll:false,
  type:"1",
  commentId:props.replyData.commentId
})
let isLiked = computed(()=>{
   return likeStore.commentLikeList.some((likeList) => {
      return (
        likeList.commentId === props.replyData.commentId && likeList.status === "0"
      );
    });
})
const clickLike=throttle(async(status:boolean)=>{
  let likePostData:LikePostData = {
    fromUid:account?.uid!,
    toUid:props.replyData.uid,
    type:'2',
    commentId:props.replyData.commentId,
    status: status === true ? "1" : "0",
  }
  if (status === true) {
    //点赞状态
    const res = await reqCancelLike(likePostData);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "取消点赞成功",
      });
      likeStore.getLikeList(account?.uid!, "2").then(()=>{
        if(memberStore.memberInfo!==null){
          if(memberStore.memberInfo.uid === props.replyData.uid){
            memberStore.getMemberInfo(props.replyData.uid)
          }
        }
        props.refreshCommentList(props.replyData.totalFatherId)
      })
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
      likeStore.getLikeList(account?.uid!, "2").then(()=>{
        if(memberStore.memberInfo!==null){
          if(memberStore.memberInfo.uid === props.replyData.uid){
            memberStore.getMemberInfo(props.replyData.uid)
          }
        }
        props.refreshCommentList(props.replyData.totalFatherId)
      })
    } else {
      ElMessage({
        type: "error",
        message: "点赞失败",
      });
    }
  }
},300)

const deleteable = computed(()=>{
  if(props.replyData.uid === account?.uid){
    return true;
  }
  return false;
})

const deleteComment = async ()=>{
  const res = await reqDeleteComment(props.replyData.commentId);
  if(res.code === 200){
    props.refreshCommentList(props.replyData.totalFatherId)
  }
}

//前往用户界面
const toMember = ()=>{
  router.push({
    name: "memberHome",
    params: { uid: props.replyData.uid },
  });
}
</script>

<style scoped lang="scss">
.reply-list-container {
  position: relative;
  margin: 10px 0;
  display: flex;
  .reply-more{
    position: absolute;
    right: 0;
    bottom: 10px;
  }
  .avatar-small {
    width: 40px;
    img {
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
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
    .response-name {
      color: #008ac5;
      cursor: pointer;
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
  }
}
</style>
