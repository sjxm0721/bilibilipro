<template>
  <div class="player-container">
    <div style="height: 100%;">
      <NPlayer :options="playerOptions" :set="setPlayer" ref="videoPlayer" style="height: 480px;"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Danmaku, { DanmakuPluginOption } from "@nplayer/danmaku";
import { Popover, Icon } from "nplayer";
import Hls from "hls.js";
import {ref,onMounted} from "vue";
import bilibiliSvg from "@/utils/bilibiliSvg";
import type{BarragePostData,BarrageData} from '@/api/barrage/type'
import { BulletOption } from "@nplayer/danmaku/dist/src/ts/danmaku/bullet";
import { useAccountStore } from "@/stores/modules/account"
import {reqSendBarrage} from '@/api/barrage/index'

let player: any = null;
const account = useAccountStore().myInfo

const props = defineProps<{poster:String,src:String,videoId:Number,getDanmakuList:Function}>()

const danmakuContent = ref<BarrageData[]>([])

//弹幕资源
const danmakuOptions= {
  autoInsert: true,
  items:danmakuContent.value as BulletOption[],
};


interface Quantity {
  el: HTMLDivElement;
  btn: HTMLDivElement;
  popover: Popover;
  itemElements: HTMLDivElement[];
  value: any;
  init(): any;
}

//控制条项
const Quantity: Quantity = {
  el: document.createElement("div"),
  btn: document.createElement("div"),
  popover: new Popover(document.createElement("div")),
  itemElements: [],
  value: null,
  init() {
    this.btn = document.createElement("div");
    this.btn.textContent = "画质";
    this.el.appendChild(this.btn);
    this.popover = new Popover(this.el);
    this.btn.addEventListener("click", () => this.popover.show());
    // 点击按钮的时候展示 popover
    this.el.style.display = "none";
    // 默认隐藏
    this.el.classList.add("quantity");
  },
};

const registerIcon = Icon.register;
registerIcon("play", bilibiliSvg.createIcon(bilibiliSvg.play));
registerIcon("volume", bilibiliSvg.createIcon(bilibiliSvg.volume));
registerIcon("cog", bilibiliSvg.createIcon(bilibiliSvg.cog));
registerIcon("webEnterFullscreen", bilibiliSvg.createIcon(bilibiliSvg.webFull));
registerIcon("enterFullscreen", bilibiliSvg.createIcon(bilibiliSvg.full));

const playerOptions = {
  poster: props.poster,
  posterEnable: true,
  controls: [
    [
      "play",
      "volume",
      "time",
      "spacer",
      Quantity,
      "airplay",
      "settings",
      "web-fullscreen",
      "fullscreen",
    ],
    ["progress"],
  ],
  bpControls: {
    600: [
      ["play", "progress", "time", "web-fullscreen", "fullscreen"],
      [],
      ["spacer", "airplay", "settings"],
    ],
  },
  plugins: [new Danmaku(danmakuOptions as DanmakuPluginOption)],
  themeColor: "rgba(35,173,229, 1)",
  volumeVertical:true,
  progressBg: "rgba(35,173,229, 1)",
  volumeProgressBg: "rgba(35,173,229, 1)",
  progressDot: bilibiliSvg.createIcon(bilibiliSvg.dot, true)(),
  posterPlayEl: bilibiliSvg.createIcon(bilibiliSvg.playBig)(),
};

const setPlayer = (p: any) => {
  player = p;
};

 //更新弹幕库
 const updateDanmaku = (newDanmakuContent:BarrageData[])=>{
    danmakuContent.value = newDanmakuContent
    player.danmaku.items = danmakuContent.value
  }


onMounted(() => {
  const hls = new Hls();
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      // 4. 给清晰度排序，清晰度越高的排在最前面
      hls.levels.sort((a, b) => b.height - a.height);
      const frag = document.createDocumentFragment();
      // 5. 给与清晰度对应的元素添加，点击切换清晰度功能
      const listener = (i: any) => (init: any) => {
        const last = Quantity.itemElements[Quantity.itemElements.length - 1];
        const prev = Quantity.itemElements[Quantity.value] || last;
        const el = Quantity.itemElements[i] || last;
        prev.classList.remove("quantity_item-active");
        el.classList.add("quantity_item-active");
        Quantity.btn.textContent = el.textContent;
        if (init !== true && !player.paused) setTimeout(() => player.play());
        // 因为 HLS 切换清晰度会使正在播放的视频暂停，我们这里让它再自动恢复播放
        Quantity.value = hls.currentLevel = hls.loadLevel = i;
        Quantity.popover.hide();
      };
      // 6. 添加清晰度对应元素
      Quantity.itemElements = hls.levels.map((l, i) => {
        const el = document.createElement("div");
        // el.textContent = l.name + "P";
        if (l.height === 1080) el.textContent += "1080P 超清";
        if (l.height === 720) el.textContent += "720P 高清";
        if (l.height === 480) el.textContent += "480P 清晰";
        el.classList.add("quantity_item");
        el.addEventListener("click", listener(i));
        frag.appendChild(el);
        return el;
      });

      const el = document.createElement("div");
      el.textContent = "自动";
      el.addEventListener("click", listener(-1));
      el.classList.add("quantity_item");
      frag.appendChild(el);
      Quantity.itemElements.push(el);
      // 这里再添加一个 `自动` 选项，HLS 默认是根据网速自动切换清晰度

      Quantity.popover.panelEl.appendChild(frag);
      Quantity.el.style.display = "block";

      listener(hls.currentLevel)(true);
      // 初始化当前清晰度
    });

    // 绑定 video 元素成功的时候，去加载视频
    hls.loadSource(props.src as string);
  });


 

  player.on("ready", () => {
  // 在播放器就绪后设置弹幕数据
  player.sendDanmaku(danmakuContent.value);
  });

  player.on("DanmakuSend", (opts: any) => {
    const {color,text,time,type} = opts
    let danmakuTmp:BarragePostData = {
      color,
      text,
      time,
      type,
      videoId:props.videoId as number,
      uid:account?.uid as number
    }
    sendBarrage(danmakuTmp)
    .then(()=>{
      props.getDanmakuList()
    })
  });

  hls.attachMedia(player.video)

});

//发送弹幕的回调
const sendBarrage = async(danmaku:BarragePostData)=>{
  await reqSendBarrage(danmaku)
}


defineExpose({
  updateDanmaku
})


</script>

<style lang="scss">
.player-container {
  background-color: black;
  max-height: 500px;
  height: 100%;
  overflow: hidden;
  width: auto;
  .quantity {
    position: relative;
    padding: 0 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    opacity: 0.8;
  }
  .quantity:hover {
    opacity: 1;
  }
  .quantity_item {
    padding: 10px 20px;
    font-weight: normal;
  }
  .quantity_item:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  .quantity_item-active {
    color: var(--theme-color);
  }
}

.nplayer_slider {
  span {
    top: 11px !important;
  }
}
</style>
