<template>
  <div class="login-container" v-show="showLogin">
    <div class="login-box">
      <div class="close-button">
        <def-svg-icon svg-name="close" @click="closeLogin"></def-svg-icon>
      </div>
      <div class="title">密码登陆</div>
      <div class="login-form">
        <form>
          <div
            class="form-item"
            style="border-top-left-radius: 8px; border-top-right-radius: 8px"
          >
            <div class="pre">账号</div>
            <input v-model="username" type="input" placeholder="请输入账号" />
          </div>
          <div
            class="form-item"
            style="
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            "
          >
            <div class="pre">密码</div>
            <input
              :type="isVisible"
              v-model="password"
              placeholder="请输入密码"
            />
            <div class="append-icon">
              <def-svg-icon
                svg-name="eyeClose"
                v-if="isVisible === 'password'"
                @click="changeVisibility"
              ></def-svg-icon>
              <def-svg-icon
                svg-name="eyeOpen"
                v-else
                @click="changeVisibility"
              ></def-svg-icon>
            </div>
          </div>
        </form>
      </div>
      <div style="margin-top: 20px">
        <el-button type="primary" size="large" style="width: 200px"
          >登陆</el-button
        >
      </div>
      <div style="color: #999; margin-top: 40px">
        登陆即代表你同意&nbsp;
        <span style="color: #00a1d6">用户协议</span>&nbsp;和 &nbsp;<span
          style="color: #00a1d6"
          >隐私政策</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isVisible = ref("password");

const showLogin = ref(false)

const username = ref("");

const password = ref("");

const changeVisibility = () => {
  if (isVisible.value === "password") isVisible.value = "input";
  else isVisible.value = "password";
};

const closeLogin = ()=>{
    showLogin.value = false
}

</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1111111;
  .login-box {
    position: relative;
    width: 600px;
    min-height: 400px;
    background-color: #fff;
    background-image: url("@/assets/images/login22.jpg"),
      url("@/assets/images/login33.jpg");
    background-position: 0 100%, 100% 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 20%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .close-button{
        position: absolute;
        right: 20px;
        top: 20px;
        svg{
            cursor: pointer;
        }
    }
    .title {
      font-size: 1.4em;
      color: #4ea5d9;
      margin: 30px;
    }
    .form-item {
      border: 1px solid #e3e5e7;
      align-items: center;
      display: flex;
      padding: 10px;
      height: 50px;
      width: 360px;
      input {
        border: none;
        width: 75%;
      }
      .pre {
        width: 15%;
      }
      .append-icon {
        width: 10%;
        svg {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
