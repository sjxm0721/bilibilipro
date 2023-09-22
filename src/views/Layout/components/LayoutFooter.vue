<template>
  <div class="layout-footer">
    <el-row :gutter="50">
      <el-col :span="17" :xs="0">
        <div class="footer-left">
          <div class="logo" style="margin: 0 0 20px 20px">
            <def-svg-icon
              svg-name="bilibili"
              svg-width="60px"
              svg-height="30px"
            ></def-svg-icon>
          </div>
          <div class="about">
            <el-row :gutter="40" justify="start">
              <el-col
                :span="12"
                style="display: flex; flex-direction: row"
                class="col1"
              >
                <el-col :span="8">
                  <div class="about-box-col">
                    <a>关于我们</a>
                    <a>联系我们</a>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="about-box-col">
                    <a>友情链接</a>
                    <a>加入我们</a>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="about-box-col">
                    <a>哔哩哔哩周边</a>
                    <a>bilibili服务协议</a>
                  </div>
                </el-col>
              </el-col>
              <el-col :span="10" style="display: flex; flex-direction: row">
                <el-col :span="12">
                  <div class="about-box-col">
                    <a>帮助中心</a>
                    <a>如何成为UP主</a>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="about-box-col">
                    <a>工具使用教程</a>
                    <a>工会中心</a>
                  </div>
                </el-col></el-col
              >
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="7" :xs="24">
        <div class="footer-right">
          <div class="assist">
            <div class="button1">
              <def-svg-icon
                svg-name="assist"
                svg-width="30px"
                svg-height="30px"
              ></def-svg-icon>
            </div>
            <div class="right-text">联系客服</div>
          </div>
          <div class="weixin">
            <div class="button2">
                <def-svg-icon
              svg-name="weixin"
              svg-width="30px"
              svg-height="30px"
            ></def-svg-icon>
            </div>
            <div class="right-text">官方微信</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout-footer {
  padding: 30px 60px;
  width: 100%;
  height: 250px;

  .footer-left {
    display: flex;
    flex-direction: column;
    padding: 10px;

    .col1 {
      border-right: 1px solid rgba($color: #9499a0, $alpha: 0.5);
    }

    .about-box-col {
      display: flex;
      flex-direction: column;
      a {
        padding: 10px 0;
        color: #9499a0;
        cursor: pointer;
        &:hover {
          color: skyblue;
        }
      }
    }
  }

  .footer-right {
    display: flex;
    justify-content: center;
    .right-text{
        margin-left: 30px;
        color: #9499a0;
    }
    .button1,
    .button2 {
      cursor: pointer;
      padding: 20px;
      margin: 20px;
      margin-top: 50px;
      border: 1px solid rgba($color: #9499a0, $alpha: 0.5);
      border-radius: 50%;
    }
    .button1:hover {
      background-color: rgb(255, 180, 0);
    }
    .button2:hover {
      background-color: green;
    }
  }
}
</style>
