<template>
  <div class="follow-content">
    <div class="follow-title">
        全部关注
        <span style="margin-left: 10px;">{{ memberStore.followTotal }}</span>
      </div>
    <div class="member-container">
      <ul>
        <li class="list-item" v-for="(item) in memberStore.followPageList" :key="item.followId">
          <div class="list-avatar">
            <img :src="item.followedAvatar" />
          </div>
          <div class="list-intro">
            <div id="name">{{ item.followedName }}</div>
            <div id="brief">{{ item.followedBrief }}</div>
          </div>
          <div class="list-button">
            <el-dropdown v-show="memberStore.memberInfo?.uid===account?.uid">
                <el-button type="info" size="small"> 已关注 </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="cancelFollow(item.followedUid)">取消关注</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            <el-button type="primary" size="small" @click="toLine(item.followedUid)">发消息</el-button>
          </div>
        </li>
      </ul>
      <div class="follow-pagination">
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="pageInfo.page"
            v-model:page-size="pageInfo.pageSize"
            layout="pager,total, jumper"
            background="true"
            :total="memberStore.followTotal"
          />
          <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type{FollowPageInfo,FollowInfo} from '@/api/follow/type'
import { onMounted, reactive} from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/modules/account';
import { useMemberStore } from '@/stores/modules/member';
import { reqCancelFollow } from '@/api/follow';

const memberStore = useMemberStore()
const route = useRoute()
const router = useRouter()
const account = useAccountStore().myInfo
const pageInfo = reactive<FollowPageInfo>({
  page:1,
  pageSize:8,
  uid:parseInt(route.params.uid as string)
})

//获取关注列表分页数据
onMounted(()=>memberStore.getFollowPageList(pageInfo))

//私信关注
const toLine = (mid:number)=>{
  router.push({
    name:'messageWhisper',
    params:{uid:account?.uid},
    query:{mid}
  })
}

//点击取消关注按钮的回调
const cancelFollow = async (followedUid:number)=>{
  const followInfo: FollowInfo = {
    followedUid,
    followerUid: account?.uid!,
  };
  await reqCancelFollow(followInfo);
  pageInfo.page = 1
  memberStore.getMemberInfo(parseInt(route.params.uid as string))
  memberStore.getFollowPageList(pageInfo);
}

</script>

<style scoped lang="scss">
.follow-content {
  .follow-title{
      height: 40px;
      font-size: 1.3em;
      border-bottom: 1px solid #eee;
    }
  .member-container {
    padding-bottom: 10px;
    ul {
      padding: 0 20px 20px;
      .list-item {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        display: flex;
        .list-avatar {
          width: 10%;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border-radius: 50%;
            cursor: pointer;
          }
        }
        .list-intro {
          width: 70%;
          #name {
            font-size: 1.3em;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 2em;
          }
          #brief {
            font-size: 0.9em;
            line-height: 1.5em;
            color: #6d757a;
            width: 80%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
          }
        }

        .list-button {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 20%;
        }
      }
    }
    .follow-pagination{
        margin: 20px;
    }
  }
}
</style>
