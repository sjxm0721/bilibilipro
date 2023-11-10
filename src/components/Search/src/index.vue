<template>
  <div class="def-search-container">
    <div class="search-history">
      <div class="history-title clearfix">
        <div class="left">搜索历史</div>
        <div class="right">清空</div>
      </div>
      <div class="history-content">
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> hh </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
        <div class="tag-container">
          <el-tag effect="plain" size="small" closable> 四季夏目 </el-tag>
        </div>
      </div>
    </div>
    <div class="search-hot">
        <div class="hot-title">
            bilibilipro热搜
        </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
    }
  }
}
</style>
