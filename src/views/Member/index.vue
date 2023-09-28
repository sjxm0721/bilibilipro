<template>
  <div style="background-color: #f4f5f7">
    <div class="member-container">
      <div class="container-head">
        <div class="info-bg">
          <div class="member-info">
            <div class="avatar">
              <img src="@/assets/images/avatar.jpg" />
            </div>
            <div class="intro">
              <div id="name">不知出远子</div>
              <div id="brief">小可爱，谢谢关注！！</div>
            </div>
            <div class="button-right">
              <el-button type="success" size="large">关注</el-button>
              <el-button type="info" size="large">发消息</el-button>
            </div>
          </div>
          <div id="shadow"></div>
        </div>
        <div class="info-route">
          <div class="route-left">
            <div id="home" @click="changeRoute(0)" :class="{choosed:routeChoosed===0}">
              <def-svg-icon
                svg-name="memberHome"
                svg-color="#00C091"
                svg-width="18px"
                svg-height="18px"
              ></def-svg-icon>
              主页
            </div>
            <div id="active" @click="changeRoute(1)" :class="{choosed:routeChoosed===1}">
              <def-svg-icon
                svg-name="memberActive"
                svg-color="#FB7299"
                svg-width="20px"
                svg-height="20px"
              ></def-svg-icon>
              动态
            </div>
              <div id="contribute" @click="changeRoute(2)" :class="{choosed:routeChoosed===2}">
              <def-svg-icon
                svg-name="memberContribute"
                svg-color="#02B5DA"
                svg-width="20px"
                svg-height="20px"
              ></def-svg-icon>
              投稿
            </div>

            <div id="collect" @click="changeRoute(3)" :class="{choosed:routeChoosed===3}">
              <def-svg-icon
                svg-name="collectionSolid"
                svg-color="#F3A034"
                svg-width="20px"
                svg-height="20px"
              ></def-svg-icon>
              收藏
            </div>
          </div>
          <div class="route-right">
            <div style="cursor: pointer;" @click="toFollow">
              <div class="route-right-top">关注数</div>
              <div class="route-right-number">71</div>
            </div>
            <div style="cursor: pointer;" @click="toFans">
              <div class="route-right-top">粉丝数</div>
              <div class="route-right-number">233万</div>
            </div>
            <div>
              <div class="route-right-top">获赞数</div>
              <div class="route-right-number">1100.1万</div>
            </div>
            <div>
              <div class="route-right-top">播放数</div>
              <div class="route-right-number">11.2亿</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router';
import { ref,onMounted } from 'vue';

const routeChoosed = ref(0)
const router = useRouter()
const route = useRoute()

onMounted(()=>{
  const newPath:string = route.fullPath
  if(newPath.includes('dynamic')){
    changeRoute(1)
  }
  else if(newPath.includes('video')){
    changeRoute(2)
  }
  else if(newPath.includes('favlist')){
    changeRoute(3)
  }
  else{
    changeRoute(0)
  }
})

const changeRoute = (newRoute:number)=>{
  routeChoosed.value = newRoute
  if(newRoute===0){
    router.push("/member/114514")
  }
  else if(newRoute===1){
    router.push("/member/114514/dynamic")
  }
  else if(newRoute===2){
    router.push("/member/114514/video")
  }
  else if(newRoute===3){
    router.push("/member/114514/favlist")
  }
}

const toFans=()=>{
  router.push('/member/114514/fans/fans')
}

const toFollow=()=>{
  router.push('/member/114514/fans/follow')
}

</script>

<style scoped lang="scss">
.member-container {
  margin: 0 10%;
  .container-head {
    height: 250px;
    .info-bg {
      height: 75%;
      background-image: url("@/assets/images/memberBg.jpg");
      position: relative;

      #shadow {
        height: 36%;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-image: linear-gradient(to top, #000, #ced2e5);
        opacity: 0.2;
      }

      .member-info {
        display: flex;
        height: 40%;
        width: 100%;
        position: absolute;
        z-index: 1;
        bottom: 0;
        .avatar {
          width: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
        .intro {
          width: 70%;
          #name {
            font-size: 1.5em;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 700;
            line-height: 2em;
            color: #fff;
          }
          #brief {
            color: #e2e3e7;
            width: 80%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
          }
        }
        .button-right {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 20%;
        }
      }
    }
    .info-route {
      height: 25%;
      display: flex;
      background-color: #fff;
      .route-left {
        width: 80%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .choosed{
          color:#00a1d6;
        }
        div {
          cursor: pointer;
          margin: 0 2%;
          &:hover {
            color: #00a1d6;
          }
        }
      }
      .route-right {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          .route-right-top {
            color: #99a2aa;
          }
          .route-right-top,
          .route-right-number {
            font-size: 12px;
            line-height: 20px;
          }
          &:hover {
            color: #00a1d6;
            & .route-right-top {
              color: #00a1d6;
            }
          }
        }
      }
    }
  }
  .container-body{
    margin: 10px 0;
    border-radius: 4px;
    box-shadow: 0 0 0 1px #eee;
  }
}
</style>
