<template>
  <div class="upload-main-container clearfix">
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
                  <el-button type="primary" @click="submitForm(formRef)"> 投稿 </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="right">
              <div class="video-src-upload">
                <el-upload
                  class="upload-demo"
                  drag
                  action="/api/user/common/uploadVideo"
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
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { UploadProps } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import type { Category } from "@/api/category/type";
import { reqGetHomeCategory } from "@/api/category";
import { useAccountStore } from "@/stores/modules/account";
import type { VideoRuleForm } from "@/api/video/type";
import { reqAddVideo } from "@/api/video/index";

const accountStore = useAccountStore();

const formSize = ref("default");
const formRef = ref<FormInstance>();
const videoRuleForm = reactive<VideoRuleForm>({
  poster: "",
  title: "",
  videoBrief: "",
  tags: [],
  src: "",
  lastTime: 0,
  uid: accountStore.myInfo!.uid,
});

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

//获取首页分类列表数据
const categoryList = ref<Category[]>();
const getHomeCategory = async () => {
  const res = await reqGetHomeCategory();
  categoryList.value = res.data;
};
onMounted(() => getHomeCategory());

//上传视频封面相关
const handlePosterSuccess: UploadProps["onSuccess"] = (response) => {
  videoRuleForm.poster = response.data;
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

//上传视频资源相关
const handleVideoSuccess: UploadProps["onSuccess"] = (response) => {
  videoRuleForm.src = response.data.src;
  videoRuleForm.lastTime = response.data.lastTime;
};

const beforeVideoUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "video/mp4") {
    console.log(rawFile.type);
    ElMessage.error("video must be MP4 format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 300) {
    ElMessage.error("video picture size can not exceed 300MB!");
    return false;
  }
  return true;
};

const addVideo = async (data: VideoRuleForm) => {
  await reqAddVideo(data);
};

const submitForm =  (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      //提交
      addVideo(videoRuleForm).then(() => {
        ElMessage({
          type:'success',
          message:'上传视频成功'
        })
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

const activeName = ref("Video");
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
</style>
