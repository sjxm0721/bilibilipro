<template>
    <div class="error-container">
        <div class="error-404">
            <img src="https://bilibilipro.oss-cn-beijing.aliyuncs.com/pic_used_in_web/sorry.jpg">
            <div class="error-button">
                <el-button type="primary" size="large" @click="routerBack">返回上一页</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import{useRouter} from 'vue-router'

const router = useRouter()

const routerBack = ()=>{
    router.back()
}

</script>

<style lang="scss" scoped>
.error-container{
    width: 980px;
    margin: 30px auto 30px;
    background: #fff;
    border-radius: 10px;
    .error-404{
        overflow: hidden;
        .error-button{
            text-align: center;
            padding: 0 0 40px 0;
        }
    }
}
</style>