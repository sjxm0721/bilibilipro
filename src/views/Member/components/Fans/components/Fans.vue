<template>
    <div class="fans-content">
      <div class="member-container">
        <ul>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
          <li class="list-item">
            <div class="list-avatar">
              <img src="@/assets/images/arisi.jpg" />
            </div>
            <div class="list-intro">
              <div id="name">天童爱丽丝</div>
              <div id="brief">邦邦卡邦，跟着天童爱丽丝一起速通原神吧！！</div>
            </div>
            <div class="list-button">
              <el-button type="success" size="small">关注</el-button>
              <el-button type="info" size="small">发消息</el-button>
            </div>
          </li>
        </ul>
        <div class="fans-pagination">
        <div class="demo-pagination-block">
          <el-pagination
            current-page="1"
            page-size="10"
            page-sizes="[100, 200, 300, 400]"
            layout="pager,total, jumper"
            background="true"
            :total="200"
          />
          <!-- :small="small"
            :disabled="disabled"
            :background="background" -->
          <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped lang="scss">
  .fans-content {
    .member-container {
      padding-bottom: 10px;
      ul {
        padding: 0 20px 20px;
        .list-item {
          padding: 20px 0;
          border-bottom: 1px solid #eee;
          display: flex;
          .list-avatar {
            width: 10%;
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              border-radius: 50%;
              cursor: pointer;
            }
          }
          .list-intro {
            width: 70%;
            #name {
              font-size: 1.3em;
              font-family: Arial, Helvetica, sans-serif;
              line-height: 2em;
            }
            #brief {
              font-size: 0.9em;
              line-height: 1.5em;
              color: #6d757a;
              width: 80%;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-wrap: break-word;
            }
          }
  
          .list-button {
           display: flex;
           justify-content: space-around;
           align-items: center;
            width: 20%;
          }
        }
      }
      .fans-pagination{
        margin: 20px;
      }
    }
  }
  </style>
  