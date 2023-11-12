<template>
  <div class="def-search-container">
    <div class="search-history">
      <div class="history-title clearfix">
        <div class="left">搜索历史</div>
        <div class="right" @click="clear">清空</div>
      </div>
      <div class="history-content" v-show="searchStore.searchHistoryInfoList!==null&&searchStore.searchHistoryInfoList.length>0">
        <div class="tag-container" v-for="(item,index) in searchStore.searchHistoryInfoList" :key="index">
          <el-tag effect="plain" size="small" closable @close="closeTag(item.searchContent)" @click="clickSearch(item.searchContent)"> {{ item.searchContent }} </el-tag>
        </div>
      </div>
    </div>
    <div class="search-hot">
        <div class="hot-title">
            bilibilipro热搜
        </div>
        <div class="hot-content">
          <ul>
            <li v-for="(item,index) in searchStore.searchHotList" :key="index" @click="clickSearch(item.searchContent)">
              <div class="li-index">{{ index+1 }}</div>
              <div class="li-content">{{ item.searchContent }}</div>
              <div class="li-count">{{ item.searchNum }}</div>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/modules/search';
import { localClear, localRemove } from '@/utils/localStorageUtil';
import { onMounted } from 'vue';

const props = defineProps<{toSearch:Function}>()

const searchStore = useSearchStore()

onMounted(()=>searchStore.getSearchHistory())

//清空历史记录的回调方法
const clear = ()=>{
  localRemove("searchHistory")
  searchStore.getSearchHistory()
  searchStore .getSearchHotList()
}

//删除历史记录标签的回调方法
const closeTag = (searchContent:string)=>{
  searchStore.closeSearchHistory(searchContent)
}

//点击历史记录标签的回调方法
const clickSearch = (searchContent:string)=>{
  props.toSearch(searchContent)
}


</script>

<style scoped lang="scss">
.def-search-container {
  padding: 15px 10px;
  .search-history {
    margin-bottom:15px;
    .clearfix {
      &::before,
      &::after {
        content: "";
        display: table;
      }
      &::after {
        clear: both;
      }
    }
    .history-title {
        margin-bottom:12px;
        .left {
        float: left;
        font-size: 15px;
        color: #18191c;
        font-weight: 500;
      }
      .right {
        float: right;
        font-size: 12px;
        color: #9499a0;
        cursor: pointer;
        &:hover {
          color: #06aeec;
        }
      }
    }
    .history-content{
        .tag-container{
            cursor:pointer;
            margin:5px 3px;
            display:inline-block;
        }
    }
  }
  .search-hot{
    .hot-title{
        font-size: 15px;
        color: #18191c;
        font-weight: 500;
        margin-bottom: 15px;
    }
    .hot-content{
      ul{
        li{
          display: flex;
          justify-content: space-around;
          height:38px;
          align-items: center;
          cursor:pointer;
          border-radius: 4px;
          &:hover{
            background-color:#E3E5E7;
          }
          .li-index{
            font-weight: 700;
          }
          .li-content{
            width: 70%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing: 0;
          }
          .li-count{
            color:#F85A54;
          }
        }
      }
    }
  }
}
</style>
