<template>
  <div class="fans-container">
    <div class="left-nav">
      <div class="nav-container">
        <div class="nav-title">我的关注</div>
        <div
          class="nav-content"
          @click="changeNav('follow')"
          @mouseenter="mouseIn('follow')"
          @mouseleave="mouseOut"
          :class="{
            choosed: navChoosed === 'follow',
            'mouse-in': navMouseIn === 'follow',
          }"
        >
          <div class="nav-logo">
            <def-svg-icon
              svg-name="follow"
              :svg-color="navColor.follow"
            ></def-svg-icon>
            全部关注
          </div>
          <div class="nav-num" :style="{ color: navColor.follow }">100</div>
        </div>
      </div>
      <div class="nav-container">
        <div class="nav-title">我的粉丝</div>
        <div
          class="nav-content"
          @click="changeNav('fans')"
          @mouseenter="mouseIn('fans')"
          @mouseleave="mouseOut"
          :class="{
            choosed: navChoosed === 'fans',
            'mouse-in': navMouseIn === 'fans',
          }"
        >
          <div class="nav-logo">
            <def-svg-icon
              svg-name="fans"
              :svg-color="navColor.fans"
            ></def-svg-icon>
            全部粉丝
          </div>
          <div class="nav-num" :style="{ color: navColor.fans }">10万</div>
        </div>
      </div>
    </div>
    <div class="right-show">
      <div class="right-top-title">
        {{ rightTopTitle() }}
      </div>
      <router-view :key="route.fullPath"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const navChoosed = ref("");
const navMouseIn = ref("");
const navColor = reactive({
  follow: "#99A2AA",
  fans: "#99A2AA",
});

onMounted(()=>{
    const routePath:string = route.fullPath
    if(routePath.includes('/fans/follow')) changeNav('follow')
    if(routePath.includes('/fans/fans')) changeNav('fans') 
})

const changeNav = (newNav: string) => {
  navColor.follow = "#99A2AA";
  navColor.fans = "#99A2AA";
  navChoosed.value = newNav;
  navMouseIn.value = "";
  navColor[newNav] = "#fff";
  router.push(`/member/114514/fans/${newNav}`)
};

const mouseIn = (newNav: string) => {
  if (newNav !== navChoosed.value) {
    navMouseIn.value = newNav;
  }
};

const mouseOut = () => {
  navMouseIn.value = "";
};

const rightTopTitle=()=>{
  if(navChoosed.value === 'follow') return '全部关注'
  if(navChoosed.value === 'fans') return '全部粉丝'
  else return ''
}
</script>

<style scoped lang="scss">
.fans-container {
  display: flex;
  .left-nav {
    width: 16%;
    background-color: #fff;

    .nav-container {
      border-bottom: 1px solid #eee;
      .nav-title {
        height: 48px;
        padding: 20px 0 0 20px;
        color: #99a2aa;
      }
      .mouse-in {
        background-color: rgb(244, 244, 244);
      }
      .choosed {
        background-color: #00a1d6;
        color: #fff;
      }

      .nav-content {
        cursor: pointer;
        display: flex;
        height: 44px;
        margin: 10px 0 20px;
        align-items: center;
        justify-content: space-around;
        transition: background-color .3s ease;
        .nav-logo{
            svg{
                margin-right: 3px;
            }
        }
      }
    }
  }
  .right-show {
    width: 84%;
    padding: 30px 15px;
    vertical-align: baseline;
    background-color: #fff;
    .right-top-title{
      height: 40px;
      font-size: 1.3em;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
