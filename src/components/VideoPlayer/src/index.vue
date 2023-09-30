<template>
  <div class="player-container">
    <NPlayer :options="playerOptions" :set="setPlayer" ref="videoPlayer" />
  </div>
</template>
<script lang="ts" setup>
import Danmaku from "@nplayer/danmaku";
import { Popover, Icon } from "nplayer";
import Hls from "hls.js";
import { onMounted } from "vue";
import bilibiliSvg from "../../../utils/bilibiliSvg";

let player:any = null;

//弹幕资源
const danmakuOptions = {
  autoInsert: true,
  items: [
    { time: 1, text: "弹幕～" },
    { time: 52, text: "星野爱" },
  ],
};

interface Quantity{
    el:HTMLDivElement;
    btn:HTMLDivElement;
    popover:Popover;
    itemElements:HTMLDivElement[];
    value:any;
    init():any
}

//控制条项
const Quantity:Quantity = {
  el: document.createElement("div"),
  btn:document.createElement("div"),
  popover:new Popover(document.createElement("div")),
  itemElements:[],
  value:null,
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
  // src:"http://43.138.245.107/index.m3u8",
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
  plugins: [new Danmaku(danmakuOptions)],
  themeColor: "rgba(35,173,229, 1)",
  progressBg: "rgba(35,173,229, 1)",
  volumeProgressBg: "rgba(35,173,229, 1)",
  progressDot: bilibiliSvg.createIcon(bilibiliSvg.dot, true)(),
  posterPlayEl: bilibiliSvg.createIcon(bilibiliSvg.playBig)(),
};

const setPlayer = (p:any) => {
  player = p;
};

onMounted(() => {
  const hls = new Hls();
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      // 4. 给清晰度排序，清晰度越高的排在最前面
      hls.levels.sort((a, b) => b.height - a.height);
      const frag = document.createDocumentFragment();
      // 5. 给与清晰度对应的元素添加，点击切换清晰度功能
      const listener = (i:any) => (init:any) => {
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
    hls.loadSource("http://43.138.245.107/master.m3u8");
  });

  player.on('DanmakuSend', (opts:any) => {
  console.log(opts)
})

  hls.attachMedia(player.video);
});
</script>

<style lang="scss">
.player-container {
  background-color: black;
  width: 100%;
  height: 100%;
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

.nplayer_slider{
    span{
      top:11px !important;
    }
  }
</style>
