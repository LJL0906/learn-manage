<template>
  <el-drawer
    v-model="isShow"
    title="您的信息"
    direction="rtl"
    :before-close="close"
    size="50%"
  >
    <el-descriptions class="margin-top" :column="2" size="default" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <UserFilled />
            </el-icon>
            账号
          </div>
        </template>
        {{ userData.user || "-" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <User />
            </el-icon>
            姓名
          </div>
        </template>
        {{ userData.name || "-" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Iphone />
            </el-icon>
            联系电话
          </div>
        </template>
        {{ userData.phone || "-" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Message />
            </el-icon>
            邮箱
          </div>
        </template>
        {{ userData.email || "-" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Promotion />
            </el-icon>
            个人爱好
          </div>
        </template>
        {{ userData.hobby || "-" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <OfficeBuilding />
            </el-icon>
            工作经验
          </div>
        </template>
        {{ userData.experience || "-" }}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <ChatLineSquare />
            </el-icon>
            备注
          </div>
        </template>
        {{ userData.experience || "-" }}
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useLogin } from "@/store/modules/login";
import { useRef, useModal } from "@/hooks";
import {
  User,
  Iphone,
  Message,
  OfficeBuilding,
  Promotion,
  UserFilled,
  ChatLineSquare,
} from "@element-plus/icons-vue";

const loginStore = useLogin();

const { isShow, open, close } = useModal({
  resetOnClose: true,
});
const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap["default"] || marginMap.default,
  };
});

const userData = useRef({
  ...loginStore.userInfo,
});

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
:deep(.el-descriptions__cell) {
  width: 120px;
}
</style>
