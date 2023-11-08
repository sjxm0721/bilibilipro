<template>
  <div class="dynamic-content-container" v-if="dynamicPageList.length>0" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
    <div class="dynamic-content box" v-for="(item) in dynamicPageList" :key="item.dynamicId">
      <def-dynamic :dynamicData="item" :refreshDynamicList="refreshDynamicList"></def-dynamic>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqGetDynamicPageInfo } from "@/api/dynamic";
import { onMounted, reactive, ref } from "vue";
import type{ DynamicPageInfo,DynamicData } from "@/api/dynamic/type";
const pageInfo = reactive<DynamicPageInfo>({
  page:1,
  pageSize:10,
  uid:undefined
}) 

const dynamicPageList = ref<DynamicData[]>([])
const getDynamicPageInfo = async (fromFather:boolean)=>{
    if(fromFather===true){
      pageInfo.page = 1
      disabled.value=false
    }
    const res = await reqGetDynamicPageInfo(pageInfo)
    dynamicPageList.value = res.data.record
}

onMounted(()=>getDynamicPageInfo(false))


//加载更多
const disabled = ref(false)
const load = async ()=>{
  //获取下一页数据
  console.log("来加载数据了")
  pageInfo.page++
  const res = await reqGetDynamicPageInfo(pageInfo)
  dynamicPageList.value = [...dynamicPageList.value,...res.data.record]
  if(res.data.record.length===0){
    disabled.value = true
  }
}

//重新获取某一条评论
const refreshDynamicList=async (dynamicId:number)=>{
  let num:number
  let len:number = dynamicPageList.value?.length
  for(num=0;num<len;num++){
    if(dynamicPageList.value[num].dynamicId === dynamicId){
      break
    }
  }
  num = Math.floor(num / pageInfo.pageSize) + 1
  const arr1:DynamicData[]|undefined = dynamicPageList.value.slice(0,(num-1)*pageInfo.pageSize)
  const arr3:DynamicData[]|undefined = dynamicPageList.value.slice(num*pageInfo.pageSize)
  pageInfo.page = num
  const res = await reqGetDynamicPageInfo(pageInfo);
  const arr2:DynamicData[] = res.data.record
  if (arr1 && arr3) {
  dynamicPageList.value = arr1.concat(arr2, arr3);
} else if (arr1) {
  dynamicPageList.value = arr1.concat(arr2);
} else if (arr3) {
  dynamicPageList.value = arr2.concat(arr3);
} else {
  dynamicPageList.value = arr2;
}
pageInfo.page = len/pageInfo.pageSize
}

defineExpose({
  getDynamicPageInfo,
  pageInfo
})

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
