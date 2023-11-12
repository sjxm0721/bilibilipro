<template>
    <div class="fans-content">
      <div class="fans-title">
        全部粉丝
        <span style="margin-left: 10px;">{{ memberStore.fansTotal }}</span>
      </div>
      <div class="member-container">
        <ul>
          <li class="list-item" v-for="(item) in memberStore.fansPageList" :key="item.followId">
            <div class="list-avatar" @click="toMember(item.followerUid)">
              <img :src="item.followerAvatar" />
            </div>
            <div class="list-intro">
              <div id="name" @click="toMember(item.followerUid)">{{ item.followerName }}</div>
              <div id="brief">{{ item.followerBrief }}</div>
            </div>
            <div class="list-button">
              <el-button type="primary" size="small" @click="toLine(item.followerUid)">发消息</el-button>
            </div>
          </li>
        </ul>
        <div class="fans-pagination">
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="pageInfo.page"
            v-model:page-size="pageInfo.pageSize"
            layout="pager,total, jumper"
            background="true"
            :total="memberStore.fansTotal"
          />
          <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import type{FollowPageInfo} from '@/api/follow/type'
import { onMounted, reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/modules/account';
import { useMemberStore } from '@/stores/modules/member';

const memberStore = useMemberStore()
const route = useRoute()
const router = useRouter()
const pageInfo = reactive<FollowPageInfo>({
  page:1,
  pageSize:8,
  uid:parseInt(route.params.uid as string)
})
const accountStore = useAccountStore()

//获取关注列表分页数据
onMounted(()=>memberStore.getFansPageList(pageInfo))


//私信粉丝
const toLine = (mid:number)=>{
  router.push({
    name:'messageWhisper',
    params:{uid:accountStore.myInfo?.uid},
    query:{mid}
  })
}

//前往粉丝用户页面
const toMember = (uid:number) => {
  router.push({
    name: "memberHome",
    params: { uid },
  });
};


</script>
  
  <style scoped lang="scss">
  .fans-content {
    .fans-title{
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
              cursor: pointer;
              &:hover{
                color:#00AEEC;
              }
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
      .fans-pagination{
        margin: 20px;
      }
    }
  }
  </style>
  