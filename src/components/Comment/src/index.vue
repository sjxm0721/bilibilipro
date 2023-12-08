<template>
  <div class="video-comment-container">
    <div class="comment-head">
      <div class="comment-info">
        <div class="head-left">评论</div>
        <div class="head-num">{{ commentList?.total }}</div>
        <div class="order-hotest">
          <span
            style="cursor: pointer"
            :class="{
              choosed: pageInfo.order === 0,
              'mouse-in': hoverOrder === 0,
            }"
            @click="changeOrder(0)"
            @mouseenter="mouseInOrder(0)"
            @mouseleave="mouseOutOrder"
            >最热</span
          >
        </div>
        <div class="order-newest">
          <span
            style="cursor: pointer"
            :class="{
              choosed: pageInfo.order === 1,
              'mouse-in': hoverOrder === 1,
            }"
            @click="changeOrder(1)"
            @mouseenter="mouseInOrder(1)"
            @mouseleave="mouseOutOrder"
            >最新</span
          >
        </div>
      </div>
      <div class="comment-publish">
        <div class="avatar-big" @click="toMember">
          <img :src="account?.avatar"/>
        </div>
        <div class="textarea-and-button">
          <el-input
            v-model="replyCommentInfo.content"
            :rows="2"
            type="input"
            placeholder="这里是评论区,不是无人区;-)"
            style="width: 80%"
            size="large"
          />
          <el-button type="primary" size="large" @click="publishFatherComment"
            >发布</el-button
          >
        </div>
      </div>
    </div>
    <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
      <div
        class="comment-body"
        v-if="commentList"
        v-for="item in commentList?.record"
        :key="item.commentId"
      >
        <CommentBody
          :commentData="item"
          :refreshCommentList="refreshCommentList"
          :refreshDeletedCommentList="refreshDeletedCommentList"
        ></CommentBody>
      </div>
    </div>
    <div class="no-more-comment" v-show="disabled">没有更多评论</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import CommentBody from "./components/CommentBody.vue";
import type {
  CommentData,
  PageComment,
  ReplyCommentInfo,
} from "@/api/comment/type";
import { useRouter } from "vue-router";
import { reqGetCommentPageList, reqReplyComment } from "@/api/comment/index";
import type { CommentPageInfo } from "@/api/comment/type";
import { useAccountStore } from "@/stores/modules/account";
import type { message } from "@/utils/websocketClass";
import { ElMessage } from "element-plus";
import { useWebSocketStore } from "@/stores/modules/websocket";

const router = useRouter()
const websocketStore = useWebSocketStore();
const accountStore = useAccountStore();

const account = accountStore.myInfo;

const props = defineProps<{
  videoId?: number;
  dynamicId?: number;
  toUid?: number;
  refreshDynamicList?: Function;
}>();

const hoverOrder = ref(-1);

const commentList = ref<PageComment>();
const pageInfo: CommentPageInfo = reactive({
  order: 0,
  page: 1,
  pageSize: 5,
});

const changeOrder = (newOrder: number) => {
  hoverOrder.value = -1;
  pageInfo.order = newOrder;
  pageInfo.page = 1;
  getCommentList();
};

const mouseInOrder = (newOrder: number) => {
  if (newOrder != pageInfo.order) hoverOrder.value = newOrder;
};

const mouseOutOrder = () => {
  hoverOrder.value = -1;
};

//获取评论数据
const getCommentList = async () => {
  disabled.value = false;
  if (props.videoId) {
    pageInfo.videoId = props.videoId;
  } else if (props.dynamicId) {
    pageInfo.dynamicId = props.dynamicId;
  }
  const res = await reqGetCommentPageList(pageInfo);
  commentList.value = res.data;
};

onMounted(() => getCommentList());

const replyCommentInfo = reactive<ReplyCommentInfo>({
  uid: account?.uid as number,
  content: "",
  videoId: props.videoId,
  dynamicId: props.dynamicId,
});

//发表父评论
const commentMessage = reactive<message>({
  isSystem: "0",
  fromUid: accountStore.myInfo?.uid,
  toUid: props.toUid,
  isAll: false,
  type: "3",
  nowCommentId: undefined,
  videoId: props.videoId,
  dynamicId: props.dynamicId,
});
const publishFatherComment = async () => {
  const res = await reqReplyComment(replyCommentInfo);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "发表评论成功",
    });
    replyCommentInfo.content = "";
    pageInfo.page = 1;
    commentMessage.nowCommentId = res.data
    websocketStore.sendMessage(JSON.stringify(commentMessage));
    getCommentList().then(() => {
      if (props.dynamicId !== null) {
        props.refreshDynamicList!(props.dynamicId);
      }
    });
  } else {
    ElMessage({
      type: "error",
      message: "发表评论失败",
    });
  }
};

//加载更多
const disabled = ref(false);
const load = async () => {
  //获取下一页数据
  pageInfo.page++;
  if (props.videoId) {
    pageInfo.videoId = props.videoId;
  } else if (props.dynamicId) {
    pageInfo.dynamicId = props.dynamicId;
  }
  const res = await reqGetCommentPageList(pageInfo);
  commentList.value?.record.push.apply(
    commentList.value.record,
    res.data.record
  );
  if (res.data.record.length === 0) {
    disabled.value = true;
  }
};

//删除评论后重新更新评论列表
const refreshDeletedCommentList = async (totalFatherId: number) => {
  commentList.value!.record = commentList.value!.record.filter((item) => {
    return item.commentId !== totalFatherId;
  });
  commentList.value!.total = commentList.value!.total - 1;
  if (props.dynamicId !== null) {
    props.refreshDynamicList!(props.dynamicId);
  }
};

const refreshCommentList = async (totalFatherId: number) => {
  let num: number;
  let len: number = (commentList.value?.record as CommentData[]).length;
  for (num = 0; num < len; num++) {
    if (commentList.value?.record[num].commentId === totalFatherId) {
      break;
    }
  }
  num = Math.floor(num / pageInfo.pageSize) + 1;
  const arr1: CommentData[] | undefined = commentList.value?.record.slice(
    0,
    (num - 1) * pageInfo.pageSize
  );
  const arr3: CommentData[] | undefined = commentList.value?.record.slice(
    num * pageInfo.pageSize
  );
  pageInfo.page = num;
  const res = await reqGetCommentPageList(pageInfo);
  const arr2: CommentData[] = res.data.record;
  if (arr1 && arr3) {
    commentList.value!.record = arr1.concat(arr2, arr3);
  } else if (arr1) {
    commentList.value!.record = arr1.concat(arr2);
  } else if (arr3) {
    commentList.value!.record = arr2.concat(arr3);
  } else {
    commentList.value!.record = arr2;
  }
  pageInfo.page = len / pageInfo.pageSize;
};

//前往用户界面
const toMember = ()=>{
  router.push({
    name: "memberHome",
    params: { uid: accountStore.myInfo!.uid },
  });
}
</script>

<style scoped lang="scss">
.video-comment-container {
  img {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .comment-head {
    height: 100px;
    margin: 30px 0;
    .comment-info {
      display: flex;
      align-items: center;
      .head-left {
        font-size: 1.5em;
        margin-right: 5px;
      }
      .head-num {
        color: #9499a0;
        margin-right: 30px;
      }
      .choosed {
        color: #000;
      }
      .mouse-in {
        color: #06aeec;
      }
      .order-hotest,
      .order-newest {
        color: #9499a0;
        padding: 0 15px;
      }
      .order-hotest {
        border-right: 1px solid #9499a0;
      }
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
  .no-more-comment {
    margin: 15px 0;
    color: #9499a0;
    text-align: center;
  }
}
</style>
