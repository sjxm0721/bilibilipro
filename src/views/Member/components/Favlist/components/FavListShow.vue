<template>
  <div class="fav-list-show-container">
    <div class="top-brief">
      <div class="poster-container">
        <img :src="fatherFav.favPoster" />
        <div class="icon-poster">
          <el-icon><Collection color="#fff" /></el-icon>
        </div>
        <div class="icon-back"></div>
      </div>
      <div class="fav-list-info">
        <div class="title">{{ fatherFav.favTitle }}</div>
        <div class="author">创建者: {{ fatherFav.name }}</div>
        <div class="number-private">
          {{ fatherFav.favNum }}个内容&nbsp;&nbsp;&nbsp;&nbsp;{{
            fatherFav.isPublic === "1" ? "私密" : "公开"
          }}
        </div>
      </div>
      <div class="top-btn" v-show="parseInt(route.params.uid as string) === accountStore.myInfo?.uid">
          <el-popconfirm title="确定删除吗？" @confirm="deleteFatherFav(fatherFav.favId!)">
          <template #reference>
            <el-button  type="info">删除收藏夹</el-button>            
          </template>
        </el-popconfirm>
       
      </div>
    </div>
    <div class="fav-video-show">
      <div class="video-box" v-for="item in pageFavList" :key="item.favId">
        <def-video-fav-item :fav="item"></def-video-fav-item>
      </div>
    </div>
    <div class="video-pagination">
      <div class="demo-pagination-block" style="margin-left: 20%">
        <el-pagination
          v-model:current-page="favPage.page"
          v-model:page-size="favPage.pageSize"
          layout="pager,total, jumper"
          :background="true"
          :total="total"
        />
        <!-- @current-change="handleCurrentChange" -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Collection } from "@element-plus/icons-vue";
import type { FavList, FavPage } from "@/api/fav/type";
import { reactive, ref ,watch} from "vue";
import { reqDeleteFatherFav, reqGetPageFavList } from "@/api/fav/index";
import { useRoute,useRouter } from "vue-router";
import { useAccountStore } from "@/stores/modules/account";
import { useFavStore } from "@/stores/modules/fav";
const props = defineProps<{ fatherFav: FavList,getFatherFavList:Function }>();
const accountStore = useAccountStore()
const route = useRoute()
const router = useRouter()
const favPage = reactive<FavPage>({
  page: 1,
  pageSize: 10,
  fatherDic:props.fatherFav.favId
});
const favStore = useFavStore()


//获取输出视频列表数据
const pageFavList = ref<FavList[]>();
const total = ref<number>(0);
const getPageFavList = async () => {
  const res = await reqGetPageFavList(favPage);
  pageFavList.value = res.data.record;
  total.value = res.data.total;
};

const deleteFatherFav = async (fatherFavId:number)=>{
  const res = await reqDeleteFatherFav(fatherFavId)
  if(res.code==200){
    favStore.getFatherFavList()
    const favPage:FavPage = {
            uid:accountStore.myInfo!.uid,
            page:1,
            pageSize:10
    }
    favStore.getHistoreFavInfo(favPage)
    favStore.getTotalFavVideo()
    props.getFatherFavList().then(()=>{
      getPageFavList()
    })
    router.push({
      name:'memberFavlist',
      params:{uid:accountStore.myInfo?.uid},
    })
  }
}

watch(
  () => props.fatherFav.favId,
  (newValue) => {
    if(newValue!==undefined){
      getPageFavList()
    }
  },
  {immediate:true}
);
</script>

<style lang="scss" scoped>
.fav-list-show-container {
  .top-brief {
    display: flex;
    height: 119px;
    position: relative;
    .poster-container {
      height: 119px;
      width: 190px;
      overflow: hidden;
      border-radius: 4px;
      position: relative;
      margin-right: 20px;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .icon-poster {
        position: absolute;
        z-index: 2;
        bottom: 4px;
        right: 4px;
        font-size: 20px;
      }
      .icon-back {
        height: 24px;
        width: 21px;
        position: absolute;
        bottom: 5px;
        right: 3px;
        background-color: rgba($color: #000000, $alpha: 0.4);
      }
    }
    .fav-list-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-weight: 700;
        font-size: 1.2em;
      }
      .author,
      .number-private {
        font-size: 0.9em;
        color: #99a2aa;
      }
    }
    .top-btn {
      position: absolute;
      right: 50px;
      bottom: 0px;
    }
  }

  .fav-video-show {
    border-top: 1px solid #e5e9ef;
    margin-top: 30px;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 18% 18% 18% 18% 18%;
    grid-column-gap: 2%;
    overflow: hidden;
    .video-box {
      font-size: 11px;
      margin-top: 20px;
    }
  }
  .video-pagination {
    margin-top: 30px;
    width: 100%;
  }
}
</style>
