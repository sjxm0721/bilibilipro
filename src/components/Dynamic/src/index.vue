<template>
  <div class="dynamic-component">
    <div class="dynamic-more" v-show="deleteable">
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
              <el-popconfirm
                width="200"
                title="删除动态时会删除其下所有的评论，确认删除吗？"
                @confirm="deleteDynamic"
              >
                <template #reference>
                  <span>删除动态</span>
                </template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div style="display: flex; font-size: 1em; justify-content: space-between">
      <div class="avatar">
        <img :src="dynamicData.avatar" />
      </div>
      <div class="main-content">
        <div>
          <span class="user">{{ dynamicData.accountName }}</span>
        </div>
        <div class="publish-time">{{ dynamicData.postTime }}</div>
        <div class="dynamic-body">
          <div class="type-word">
            {{ dynamicData.text }}
          </div>
          <div class="type-video" v-if="dynamicData.videoId">
            <def-video-dynamic-item
              :videoId="dynamicData.videoId"
              :lastTime="dynamicData.lastTime"
              :poster="dynamicData.poster"
              :title="dynamicData.title"
              :videoBrief="dynamicData.videoBrief"
              :barrageNum="dynamicData.barrageNum"
              :clickNum="dynamicData.clickNum"
            ></def-video-dynamic-item>
          </div>
        </div>
        <div class="user-operation">
          <div class="operation">
            <def-svg-icon svg-name="forward" svg-color="#99A2AA"></def-svg-icon>
            <span>0</span>
          </div>
          <div class="operation" @click="clickComment">
            <def-svg-icon svg-name="comment" svg-color="#99A2AA"></def-svg-icon>
            <span>{{ dynamicData.commentNum }}</span>
          </div>
          <div class="operation">
            <def-svg-icon
              svg-name="likeLight"
              :svg-color="svgColor === true || isLiked ? '#06AEEC' : '#99A2AA'"
              @mouseover="changeSvgColor"
              @mouseleave="svgColorReturn"
              @click="clickLike(isLiked)"
            ></def-svg-icon>
            <span :style="{ color: isLiked ? '#06AEEC' : '#99A2AA' }">{{
              dynamicData.likeNum
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-body" v-if="showComment">
      <def-comment
        :dynamicId="dynamicData.dynamicId"
        :refreshDynamicList="props.refreshDynamicList"
      ></def-comment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { DynamicData } from "@/api/dynamic/type";
import { useLikeStore } from "@/stores/modules/like";
import { throttle } from "lodash";
import type { LikePostData } from "@/api/like/type";
import { useAccountStore } from "@/stores/modules/account";
import { reqCancelLike, reqAddLike } from "@/api/like";
import { ElMessage } from "element-plus";
import { useMemberStore } from "@/stores/modules/member";
import { reqDeleteDynamic } from "@/api/dynamic";

const memberStore = useMemberStore();
const props = defineProps<{
  dynamicData: DynamicData;
  refreshDynamicList: Function;
  refreshDeletedDynamicList?:Function
}>();
const accountStore = useAccountStore()
const account = useAccountStore().myInfo;

const likeStore = useLikeStore();

const showComment = ref<boolean>(false);
const clickComment = () => {
  if (showComment.value === true) {
    showComment.value = false;
  } else {
    showComment.value = true;
  }
};

const svgColor = ref<boolean>(false);

const changeSvgColor = () => {
  svgColor.value = true;
};

const svgColorReturn = () => {
  svgColor.value = false;
};

//点赞相关
let isLiked = computed(() => {
  return likeStore.dynamicLikeList.some((likeList) => {
    return (
      likeList.dynamicId === props.dynamicData.dynamicId &&
      likeList.status === "0"
    );
  });
});
const clickLike = throttle(async (status: boolean) => {
  let likePostData: LikePostData = {
    fromUid: account?.uid!,
    toUid: props.dynamicData.uid,
    type: "1",
    dynamicId: props.dynamicData.dynamicId,
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
      likeStore.getLikeList(account?.uid!, "1").then(() => {
        if (memberStore.memberInfo !== null) {
          if (memberStore.memberInfo.uid === props.dynamicData.uid) {
            memberStore.getMemberInfo(props.dynamicData.uid);
          }
        }
        //重新获取该dynamic
        props.refreshDynamicList(props.dynamicData.dynamicId);
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
      likeStore.getLikeList(account?.uid!, "1").then(() => {
        if (memberStore.memberInfo !== null) {
          if (memberStore.memberInfo.uid === props.dynamicData.uid) {
            memberStore.getMemberInfo(props.dynamicData.uid);
          }
        }
        //重新获取该dynamic
        props.refreshDynamicList(props.dynamicData.dynamicId);
      });
    } else {
      ElMessage({
        type: "error",
        message: "点赞失败",
      });
    }
  }
}, 300);

//是否显示动态删除
const deleteable = computed(() => {
  if (memberStore.memberInfo !== null) {
    if (memberStore.memberInfo.uid === account?.uid) {
      return true;
    }
  }
  return false;
});

//删除动态
const deleteDynamic = async ()=>{
  const res = await reqDeleteDynamic(props.dynamicData.dynamicId)
  if(res.code == 200){
      props.refreshDeletedDynamicList!(props.dynamicData.dynamicId)
      accountStore.getMyInfo()
  }
}
</script>

<style scoped lang="scss">
.dynamic-component {
  position: relative;
  font-size: 1em;
  padding: 0 10px;
  .dynamic-more {
    position: absolute;
    top: 0;
    right: 0;
  }
  .avatar {
    width: 8%;
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
        word-wrap: break-word;
      }
      .type-video {
        font-size: 1em;
        border: 1px solid #e3e5e7;
        border-radius: 6px;
        height: 120px;
      }
    }
    .user-operation {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-around;
      font-size: 1em;
      margin-top: 20px;
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
  // .comment-body{
  // }
}
</style>
