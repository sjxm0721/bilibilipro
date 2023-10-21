<template>
    <div class="member-video-container">
      <div class="left-nav">
        <ul>
          <li
            @click="changeNav(0)"
            @mouseenter="mouseIn(0)"
            @mouseleave="mouseOut"
            :class="{ choosed: navChoosed === 0, 'mouse-in': navMouseIn === 0 }"
          >
            <a class="category">视频</a>
            <span class="num">165</span>
          </li>
          <li
            @click="changeNav(1)"
            @mouseenter="mouseIn(1)"
            @mouseleave="mouseOut"
            :class="{ choosed: navChoosed === 1, 'mouse-in': navMouseIn === 1 }"
          >
            <a class="category">音频</a>
            <span class="num">0</span>
          </li>
          <li
            @click="changeNav(2)"
            @mouseenter="mouseIn(2)"
            @mouseleave="mouseOut"
            :class="{ choosed: navChoosed === 2, 'mouse-in': navMouseIn === 2 }"
          >
            <a class="category">专栏</a>
            <span class="num">0</span>
          </li>
          <li
            @click="changeNav(3)"
            @mouseenter="mouseIn(3)"
            @mouseleave="mouseOut"
            :class="{ choosed: navChoosed === 3, 'mouse-in': navMouseIn === 3 }"
          >
            <a class="category">相簿</a>
            <span class="num">0</span>
          </li>
        </ul>
      </div>
      <div class="right-show">
        <router-view/>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  const navChoosed = ref(0);
  const navMouseIn = ref(-1);
  const router = useRouter()

  const changeNav = (newNav: number) => {
    navChoosed.value = newNav;
    navMouseIn.value = -1;
    if(navChoosed.value === 0){
        router.push({
          name:'memberVideo'
        })
    }
    else if(navChoosed.value === 1){
      router.push({
          name:'memberAudio'
        })
    }
    else if(navChoosed.value === 2){
      router.push({
          name:'memberArticle'
        })
    }
    else if(navChoosed.value === 3){
      router.push({
          name:'memberAlbum'
        })
    }
  };
  
  const mouseIn = (newNav: number) => {
    if (newNav !== navChoosed.value) {
      navMouseIn.value = newNav;
    }
  };
  
  const mouseOut = () => {
    navMouseIn.value = -1;
  };
  

  </script>
  
  <style scoped lang="scss">
  .member-video-container {
    display: flex;
    .left-nav {
      width: 16%;
      background-color: #fff;
      border-right: 1px solid #EEE;
      ul {
        list-style: none;
        .choosed {
          background-color: #00a1d6;
          & .category,
          & .num {
            color: #fff;
          }
        }
        .mouse-in {
          background-color: #f4f5f7;
          & .category {
            color: #1296d8;
          }
        }
        li {
          cursor: pointer;
          line-height: 50px;
          padding-left: 20px;
          height: 50px;
          transition: background-color .3s ease;
          .category {
            display: inline-block;
            width: 80px;
            margin-right: 5px;
            vertical-align: middle;
          }
          .num {
            display: inline-block;
            width: 32px;
            vertical-align: middle;
            text-align: center;
            font-size: 0.8em;
            line-height: 1em;
            color: #99a2aa;
          }
        }
      }
    }
    .right-show {
      width: 84%;
      padding: 30px 15px;
      vertical-align: baseline;
      background-color: #fff;
  

  
      .right-video {
       
      }
    }
  }
  </style>
  