<template>
  <div class="upload-main-container clearfix">
    <vue3-progress />
    <div class="head-title">投稿</div>
    <div class="body-upload">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="视频投稿" name="Video">
          <div class="video-upload">
            <div class="left">
              <el-form
                ref="formRef"
                :model="videoRuleForm"
                :rules="videoRules"
                label-width="120px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
              >
                <el-form-item label="视频标题" prop="title">
                  <el-input v-model="videoRuleForm.title" />
                </el-form-item>
                <el-form-item label="视频标签" prop="tags">
                  <el-checkbox-group v-model="videoRuleForm.tags">
                    <el-checkbox
                      v-for="item in categoryList"
                      :key="item.categoryId"
                      :label="item.categoryId"
                      >{{ item.name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="视频简介" prop="videoBrief">
                  <el-input
                    v-model="videoRuleForm.videoBrief"
                    placeholder="请输入视频简介"
                    type="textarea"
                  />
                </el-form-item>
                <el-form-item label="视频封面" prop="poster">
                  <el-upload
                    class="poster-uploader"
                    action="/api/user/common/uploadPic"
                    :show-file-list="false"
                    :on-success="handlePosterSuccess"
                    :before-upload="beforePosterUpload"
                  >
                    <img
                      v-if="videoRuleForm.poster"
                      :src="videoRuleForm.poster"
                      class="poster"
                    />
                    <el-icon v-else class="poster-uploader-icon"
                      ><Plus
                    /></el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item label="视频链接" props="src">
                  <el-input
                    v-model="videoRuleForm.src"
                    placeholder="请上传视频"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="视频时长" props="lastTime">
                  <el-input
                    v-model.number="videoRuleForm.lastTime"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(formRef)">
                    投稿
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="right">
              <div class="video-src-upload">
                <div>
                  <div style="margin: 30px 0">
                    <el-radio-group v-model="uploadType" size="large">
                      <el-radio-button label="file"
                        >本地文件上传</el-radio-button
                      >
                      <el-radio-button label="bilibili"
                        >从bilibili获取资源</el-radio-button
                      >
                    </el-radio-group>
                  </div>
                </div>
                <div v-if="uploadType === 'file'">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="/api/user/common/uploadVideo"
                    :headers="headers"
                    multiple
                    :on-success="handleVideoSuccess"
                    :before-upload="beforeVideoUpload"
                  >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                      Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        mp4 files with a size less than 300MB
                      </div>
                    </template>
                  </el-upload>
                </div>
                <div v-else-if="uploadType === 'bilibili'">
                  <div style="color: #06aeec; font-size: 15px; margin: 5px">
                    bilibili视频下载
                  </div>
                  <div class="bilibili-form">
                    <el-form
                      ref="formBlRef"
                      :inline="true"
                      :rules="bilibiliUploadRules"
                      :model="bilibiliUpload"
                      class="demo-form-inline"
                    >
                      <el-form-item label="视频资源" prop="bid">
                        <el-input
                          v-model="bilibiliUpload.bid"
                          placeholder="请输入资源"
                          class="input-with-select"
                        >
                          <template #prepend>
                            <el-select
                              v-model="bilibiliUpload.videoType"
                              placeholder="类型"
                              style="width: 115px"
                            >
                              <el-option label="视频av" value="1" />
                              <el-option label="视频bv" value="2" />
                              <el-option label="课程" value="3" />
                              <el-option label="番剧" value="4" />
                            </el-select>
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="分P号" prop="pnum">
                        <el-input-number
                          v-model="bilibiliUpload.pnum"
                          :min="0"
                          :precision="0"
                        >
                        </el-input-number>
                        <span class="notify">若视频存在分P，请输入分P号</span>
                      </el-form-item>
                      <el-form-item label="SessData" prop="sessData">
                        <el-input v-model="bilibiliUpload.sessData"></el-input>
                        <span class="notify"
                          >若为会员资源，请输入b站大会员账号的SessData</span
                        >
                      </el-form-item>
                      <el-form-item>
                        <el-button
                          type="primary"
                          @click="submitBlForm(formBlRef)"
                          >确定</el-button
                        >
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <div
                  style="font-size: 16px; margin: 20px 0 10px; color: #606266"
                >
                  文件处理中：
                </div>
                <el-progress
                  :percentage="percentage"
                  :stroke-width="15"
                  striped
                  striped-flow
                  :duration="20"
                  :status="progressStatus"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文章投稿" name="Article">
          <div class="video-upload">
            <div>
              <el-form
                ref="articleFormRef"
                :model="articleRuleForm"
                :rules="articleRules"
                label-width="120px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
              >
                <el-form-item label="文章标题" prop="title">
                  <el-input v-model="articleRuleForm.title" />
                </el-form-item>
                <el-form-item label="文章分类" prop="category">
                  <el-radio-group v-model="articleRuleForm.category">
                    <el-radio :label="1">动画</el-radio>
                    <el-radio :label="2">游戏</el-radio>
                    <el-radio :label="3">影视</el-radio>
                    <el-radio :label="4">生活</el-radio>
                    <el-radio :label="5">科技</el-radio>
                    <el-radio :label="6">笔记</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="文章标签" prop="tags">
                  <el-checkbox-group v-model="articleRuleForm.tags">
                    <el-checkbox
                      v-for="item in categoryList"
                      :key="item.categoryId"
                      :label="item.categoryId"
                      >{{ item.name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="文章封面" prop="poster">
                  <el-upload
                    class="poster-uploader"
                    action="/api/user/common/uploadPic"
                    :show-file-list="false"
                    :on-success="handleArticlePosterSuccess"
                    :before-upload="beforeArticlePosterUpload"
                  >
                    <img
                      v-if="articleRuleForm.poster"
                      :src="articleRuleForm.poster"
                      class="poster"
                    />
                    <el-icon v-else class="poster-uploader-icon"
                      ><Plus
                    /></el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                  <v-md-editor
                    v-model="articleRuleForm.content"
                    height="400px"
                  ></v-md-editor>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitArticleForm(articleFormRef)"
                  >
                    投稿
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { UploadProps } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import type { Category } from "@/api/category/type";
import { reqGetHomeCategory } from "@/api/category";
import { useAccountStore } from "@/stores/modules/account";
import type { VideoRuleForm, bilibiliUploadType } from "@/api/video/type";
import { reqAddVideo, reqDlBiliVideo } from "@/api/video/index";
import { useWebSocketStore } from "@/stores/modules/websocket";
import type { message } from "@/utils/websocketClass";
import { getToken } from "@/utils/auth";
import type { DynamicPostData } from "@/api/dynamic/type";
import { reqPublishDynamic } from "@/api/dynamic";
import { ArticleRuleForm } from "@/api/article/type";
import {useArticleStore} from "@/stores/modules/article";

const articleStore = useArticleStore();
const accountStore = useAccountStore();
const websocket = useWebSocketStore();

//视频上传方式，默认为文件上传
const uploadType = ref<string>("file");

const formSize = ref("default");
const formRef = ref<FormInstance>();
const formBlRef = ref<FormInstance>();
const articleFormRef = ref<FormInstance>();
const videoRuleForm = reactive<VideoRuleForm>({
  poster: "",
  title: "",
  videoBrief: "",
  tags: [],
  src: "",
  lastTime: 0,
  uid: accountStore.myInfo!.uid,
});

const articleRuleForm = reactive<ArticleRuleForm>({
  title: "",
  content: "",
  poster: "",
  tags: [],
  category:"",
});

const bilibiliUpload = reactive<bilibiliUploadType>({
  videoType: "", //哪种类型视频
  bid: "", //对应b站视频编号
  pnum: 0, //分P编号
  sessData: "", //b站用户个人sessData
});

const bilibiliUploadRules = reactive<FormRules<bilibiliUploadType>>({
  videoType: [{ required: true, message: "请选择视频类型", trigger: "blur" }],
  bid: [{ required: true, message: "请输入视频资源号", trigger: "blur" }],
});

//下载bili资源
const dlBiliVideo = async (data: bilibiliUploadType) => {
  await reqDlBiliVideo(data);
};

const submitBlForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      //提交
      dlBiliVideo(bilibiliUpload).then(() => {
        ElMessage({
          type: "success",
          message: "获取b站资源成功",
        });
        bilibiliUpload.bid = "";
        bilibiliUpload.pnum = 0;
        bilibiliUpload.videoType = "";
        bilibiliUpload.sessData = "";
      });
    } else {
      ElMessage({
        type: "error",
        message: "获取b站资源失败",
      });
    }
  });
};

const videoRules = reactive<FormRules<VideoRuleForm>>({
  poster: [{ required: true, message: "请上传视频封面", trigger: "blur" }],
  title: [
    {
      required: true,
      message: "请输入视频标题",
      trigger: "blur",
    },
  ],
  videoBrief: [
    {
      required: true,
      message: "请输入视频简介",
      trigger: "blur",
    },
  ],
  src: [
    {
      required: true,
      message: "请上传资源",
      trigger: "blur",
    },
  ],
  lastTime: [
    {
      validator: (_, value, callback) => {
        if (value > 0) {
          callback(); // 验证通过
        } else {
          callback(new Error("请输入大于0的数值")); // 验证失败，返回错误信息
        }
      },
      trigger: "blur",
    },
  ],
});

const articleRules = reactive<FormRules<ArticleRuleForm>>({
  poster: [{ required: true, message: "请上传文章封面", trigger: "blur" }],
  title: [
    {
      required: true,
      message: "请输入文章标题",
      trigger: "blur",
    },
  ],
  category:[{required:true,message:'请选择文章分类',trigger:'blur'}],
  content: [
    {
      required: true,
      message: "请输入文章内容",
      trigger: "blur",
    },
  ],
});

//获取首页分类列表数据
const categoryList = ref<Category[]>();
const getHomeCategory = async () => {
  const res = await reqGetHomeCategory();
  categoryList.value = res.data;
};
onMounted(() => getHomeCategory());

//上传视频封面相关
const handlePosterSuccess: UploadProps["onSuccess"] = (response) => {
  if (response.code === 505) {
    ElMessage({
      type: "error",
      message: "图片上传失败",
    });
  } else {
    videoRuleForm.poster = response.data;
  }
};

const beforePosterUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("video picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("video picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const handleArticlePosterSuccess: UploadProps["onSuccess"] = (response) => {
  if (response.code === 505) {
    ElMessage({
      type: "error",
      message: "图片上传失败",
    });
  } else {
    articleRuleForm.poster = response.data;
  }
};

const beforeArticlePosterUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("video picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("article picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

//上传视频资源相关
const handleVideoSuccess: UploadProps["onSuccess"] = (response: any) => {
  if (response.code === 504) {
    ElMessage({
      type: "error",
      message: "视频上传失败，请重新上传",
    });
  } else {
    progressUp.value = true;
  }
};

const beforeVideoUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "video/mp4") {
    ElMessage({
      type: "error",
      message: "video must be MP4 format!",
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > 300) {
    ElMessage.error("video size can not exceed 300MB!");
    return false;
  }
  return true;
};

const dynamicPostData = reactive<DynamicPostData>({
  uid: accountStore.myInfo?.uid!,
  text: "我刚刚发布了新的作品,快来看看吧!",
  videoId: undefined,
});
const addVideo = async (data: VideoRuleForm) => {
  const res = await reqAddVideo(data);
  if (res.code === 200) {
    dynamicPostData.videoId = res.data;
    await reqPublishDynamic(dynamicPostData);
  }
};

//上传视频
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      //提交
      addVideo(videoRuleForm).then(() => {
        ElMessage({
          type: "success",
          message: "上传视频成功",
        });
        videoRuleForm.poster = "";
        videoRuleForm.title = "";
        videoRuleForm.videoBrief = "";
        videoRuleForm.tags = [];
        videoRuleForm.src = "";
        videoRuleForm.lastTime = 0;
      });
    } else {
      ElMessage({
        type: "error",
        message: "上传视频失败",
      });
    }
  });
};

//上传文章
const submitArticleForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      //提交
      articleStore.addArticle(articleRuleForm).then(() => {
        ElMessage({
          type: "success",
          message: "上传文章成功",
        });
        articleRuleForm.poster = "";
        articleRuleForm.title = "";
        articleRuleForm.tags = [];
        articleRuleForm.content = "";
      });
    } else {
      ElMessage({
        type: "error",
        message: "上传文章失败",
      });
    }
  });
};

const activeName = ref("Video");

//控制进度条进度
const percentage = ref<number>(0);
const progressStatus = ref<string>("");
const progressUp = ref<boolean>(false);
const increase = () => {
  if (progressUp.value === true) {
    percentage.value += 10;
    if (percentage.value > 90) {
      percentage.value = 90;
    }
  }
};

websocket.socket?.on("message", (data: string) => {
  // 处理WebSocket消息事件
  const messageTmp: message = JSON.parse(data);
  const isSystem = messageTmp.isSystem;
  const type = messageTmp.type;
  if (isSystem === "1") {
    if (type === "5") {
      if (messageTmp.content === "success") {
        progressStatus.value = "success";
        percentage.value = 100;
        progressUp.value = false;
        videoRuleForm.src = messageTmp.videoUrl!;
        videoRuleForm.lastTime = messageTmp.videoLastTime!;
      } else if (messageTmp.content === "error") {
        progressStatus.value = "success";
        progressUp.value = false;
      } else if (messageTmp.content === "in_progress") {
        progressUp.value = true;
        increase();
      }
    }
  }
});

const headers = computed(() => {
  return { Token: getToken() };
});
</script>

<style scoped lang="scss">
:deep() .el-form-item {
  margin: 30px 20px;
}
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.upload-main-container {
  width: 80%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  padding: 20px;
  margin: 0 auto;
  .head-title {
    font-size: 18px;
    margin: 10px 30px 20px;
  }
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  .video-upload {
    display: flex;
    .left {
      width: 50%;
    }
    .right {
      width: 50%;
      .video-src-upload {
        margin: 30px 20px;
        .bilibili-form {
          .notify {
            margin-left: 20px;
            color: #f56c6c;
            font-size: 12px;
          }
        }
      }
    }
  }
  .poster-uploader .poster {
    width: 144px;
    height: 90px;
    display: block;
  }
}
</style>

<style>
.poster-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.poster-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.poster-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 144px;
  height: 90px;
  text-align: center;
}
.v-md-editor__toolbar-item.v-md-icon-fullscreen.v-md-editor__toolbar-item-fullscreen {
  display: none;
}
</style>
