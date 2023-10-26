<template>
  <div class="member-video-container">
    <div class="left-nav">
      <div class="fav-list-add" @click="showEdit = true" v-show="account?.uid===memberInfo?.uid">
        <div style="margin-right: 20px; font-size: 15px; color: #99a2aa">
          新建收藏夹
        </div>
        <el-icon>
          <CirclePlusFilled color="#CBD0D8" size="1.5em" />
        </el-icon>
      </div>
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu :index="route.params.uid.toString()">
          <template #title>{{ account?.uid===memberInfo?.uid?'我的创建':'TA的创建'}}</template>
          <el-menu-item
            v-for="item in fatherFavList"
            :key="item.favId"
            :index="item.favId?.toString()"
            @click.native="changeFatherFav(item)"
            :class="{'is-active':fatherFavChosed===item}"
          >
            <el-icon><Collection /></el-icon>
            {{ item.favTitle }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right-show" v-if="fatherFavChosed">
      <FavListShow :fatherFav="fatherFavChosed" :key="fatherFavChosed.favId" />
    </div>
  </div>
  <div class="edit-mask" v-show="showEdit">
    <div class="edit-box">
      <div
        style="
          padding: 20px;
          border-bottom: 1px solid #e5e9ef;
          width: 100%;
          text-align: center;
          font-size: 1.2em;
        "
      >
        收藏夹信息
      </div>
      <el-form
        ref="formRef"
        :model="favListForm"
        :rules="rules"
        label-width="120px"
        class="fav-ruleForm"
        status-icon
      >
        <el-form-item label="收藏夹封面" prop="favPoster">
          <el-upload
            class="avatar-uploader"
            action="/api/user/common/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="favListForm.favPoster"
              :src="favListForm.favPoster"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="收藏夹名称" prop="favTitle">
          <el-input
            maxlength="20"
            show-word-limit
            placeholder="收藏夹名称"
            v-model="favListForm.favTitle"
          />
        </el-form-item>
        <el-form-item label="收藏夹隐私" prop="isPublic">
          <el-radio-group v-model="favListForm.isPublic">
            <el-radio label="0">公开收藏夹</el-radio>
            <el-radio label="1">隐藏收藏夹</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)"> 提交 </el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Collection, CirclePlusFilled, Plus } from "@element-plus/icons-vue";
import FavListShow from "@/views/Member/components/Favlist/components/FavListShow.vue";
import { onMounted, reactive, ref } from "vue";
import type { FavListPostInfo, FavList } from "@/api/fav/type.ts";
import type { FormRules, FormInstance } from "element-plus";
import { useAccountStore } from "@/stores/modules/account";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { reqGetFatherFavList, reqAddFatherFav } from "@/api/fav";
import { useRoute } from "vue-router";
import { useMemberStore } from "@/stores/modules/member";

const memberInfo = useMemberStore().memberInfo;
const account = useAccountStore().myInfo;
const formRef = ref<FormInstance>()
const route = useRoute();
const showEdit = ref<boolean>(false);
const favListForm = reactive<FavListPostInfo>({
  uid: account!.uid,
  isDic: "1",
  favTitle: "",
  favPoster: "",
  isPublic: "0",
});

const rules = reactive<FormRules<FavListPostInfo>>({
  favTitle: [
    {
      required: true,
      message: "请输入收藏夹名称",
      trigger: "blur",
    },
  ],
  favPoster: [
    {
      required: true,
      message: "请上传收藏夹封面",
      trigger: "blur",
    },
  ],
  isPublic: [
    {
      required: true,
      message: "请选择是否公开收藏夹",
      trigger: "change",
    },
  ],
});

//取消提交的回调
const cancelEdit = () => {
  showEdit.value = false;
  favListForm.favPoster = "";
  favListForm.favTitle = "";
  favListForm.isPublic = "0";
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  favListForm.favPoster = response.data;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

//获取文件夹列表数据
const fatherFavList = ref<FavList[]>();
const getFatherFavList = async () => {
  const res = await reqGetFatherFavList(parseInt(route.params.uid as string));
  fatherFavList.value = res.data;
  fatherFavChosed.value = fatherFavList.value[0];
};
onMounted(() => getFatherFavList());

//选择的文件夹
const fatherFavChosed = ref<FavList>();
const changeFatherFav = (fatherFav: FavList) => {
  fatherFavChosed.value = fatherFav;
};

//新建收藏夹
const addFatherFav = async () => {
  await reqAddFatherFav(favListForm);
};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      //提交
      addFatherFav().then(() => {
        getFatherFavList();
        showEdit.value = false;
        favListForm.favPoster = "";
        favListForm.favTitle = "";
        favListForm.isPublic = "0";
      });
    } else {
      ElMessage({
        type: "error",
        message: "新建收藏夹失败",
      });
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
:deep() .el-menu {
  border-right: none;
}
:deep() .el-sub-menu__title {
  color: #99a2aa !important;
}
:deep() .el-form-item {
  margin: 30px 20px;
}
.edit-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba($color: #000000, $alpha: 0.5);
  .edit-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 4px;
    width: 446px;
    height: 554px;
    box-shadow: 0 2px 8px 0 rgba($color: #000000, $alpha: 0.15);
    .fav-ruleForm {
      margin-top: 40px;
    }
  }
}
.member-video-container {
  display: flex;

  .left-nav {
    width: 16%;
    border-right: 1px solid #dddfe6;
    .fav-list-add {
      height: 56px;
      padding: 20px;
      font-size: 20px;
      background-color: #fff;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .right-show {
    width: 84%;
    padding: 30px 15px;
    vertical-align: baseline;
    background-color: #fff;
  }
}
.avatar-uploader .avatar {
  width: 144px;
  height: 90px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 144px;
  height: 90px;
  text-align: center;
}
</style>
