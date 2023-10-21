<template>
  <div class="dynamic-content-container" v-if="dynamicPageList.length>0" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
    <div class="dynamic-content box" v-for="(item) in dynamicPageList" :key="item.dynamicId">
      <def-dynamic :dynamicData="item"></def-dynamic>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { reqGetDynamicPageInfo } from "@/api/dynamic";
import { onMounted, reactive, ref } from "vue";
import type{ DynamicPageInfo,DynamicData } from "@/api/dynamic/type";

const route = useRoute()
const pageInfo = reactive<DynamicPageInfo>({
  page:1,
  pageSize:10,
  uid:parseInt(route.params.uid as string)
}) 

const dynamicPageList = ref<DynamicData[]>([])
const getDynamicPageInfo = async ()=>{
    const res = await reqGetDynamicPageInfo(pageInfo)
    dynamicPageList.value = res.data.record
}

onMounted(()=>getDynamicPageInfo())


//加载更多
const disabled = ref(false)
const load = async ()=>{
  //获取下一页数据
  pageInfo.page++
  const res = await reqGetDynamicPageInfo(pageInfo)
  dynamicPageList.value = [...dynamicPageList.value,...res.data.record]
  if(res.data.record.length===0){
    disabled.value = true
  }
}

</script>

<style scoped lang="scss">
.dynamic-content-container {
  .box {
    background-color: #fff;
    border-radius: 6px;
  }
  .dynamic-content {
    margin-top: 10px;
    padding: 15px;
    background-color: #fff;
  }
}
</style>
