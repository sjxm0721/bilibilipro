<template>
  <div style="margin:50px 20px;">
    <div class="container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
      <div class="video" v-for="(item,index) in videoList" :key="index">
        <def-video-item :video ="item"></def-video-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref,onMounted } from 'vue';
import {reqGetVideoPageList} from '@/api/video/index'
import type {Video} from '@/api/video/type'

//获取基础数据渲染
const videoList = ref<Video[]>([])
const reqData = reactive({
  page:1,
  pageSize:12
})
const getVideoList = async ()=>{
  const res = await reqGetVideoPageList(reqData)
  videoList.value = res.data.record
  
}
onMounted(() => {
  getVideoList()
})

//加载更多
const disabled = ref(false)
const load = async ()=>{
  //获取下一页数据
  reqData.page++
  const res = await reqGetVideoPageList(reqData)
  videoList.value = [...videoList.value,...res.data.record]
  if(res.data.record.length===0){
    disabled.value = true
  }
}

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto;
  grid-template-columns: 23% 23% 23% 23%;
  justify-content: space-between;
  .video {
    width: 100%;
    margin-bottom: 20%;
    display: flex;
    height: 240px;
  }
}
</style>