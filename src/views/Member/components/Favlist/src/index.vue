<template>
  <div class="member-video-container">
    <div class="left-nav">
        <div class="fav-list-add">
            <div style="margin-right: 30px; font-size: 15px; color:#99A2AA;">新建收藏夹</div>
            <el-icon>
                <CirclePlusFilled color="#CBD0D8" size="1.5em"/>
            </el-icon>
        </div>
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1-4">
          <template #title>我的创建</template>
          <el-menu-item index="1-4-1">
            <el-icon><Collection/></el-icon>
            默认收藏夹</el-menu-item>
          <el-menu-item index="1-4-2">
            <el-icon><Collection/></el-icon>
            查看效果</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right-show">
      <FavListShow/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Collection,
  CirclePlusFilled
} from '@element-plus/icons-vue'
import FavListShow from '@/views/Member/components/Favlist/components/FavListShow.vue'
</script>

<style scoped lang="scss">
:deep() .el-menu{
    border-right: none;
}
:deep() .el-sub-menu__title{
    color:#99A2AA !important;
}
.member-video-container {
  display: flex;
  .left-nav {
    width: 16%;
    border-right: 1px solid #DDDFE6;
    .fav-list-add{
        height: 56px;
        padding: 20px;
        font-size: 20px;
        background-color: #fff;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
  }
  .right-show {
    width: 84%;
    padding: 30px 15px;
    vertical-align: baseline;
    background-color: #fff;
  }
}
</style>
