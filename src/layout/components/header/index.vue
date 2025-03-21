<template>
  <div
    class="w-full h-[64px] flex justify-between items-center px-[10px] border border-b border-[var(--el-menu-border-color)] pr-[32px]"
  >
    <div class="cursor-pointer" @click="toggleIsCollapse">
      <el-icon size="26" color="#6776b3" v-if="isMCollapse"><Expand /></el-icon>
      <el-icon size="26" color="#6776b3" v-else> <Fold /></el-icon>
    </div>

    <div class="w-fit flex justify-center items-center cursor-pointer">
      <!-- 用户头像 -->
      <el-image
        :src="loginStore?.userInfo?.avatar"
        style="width: 32px; height: 32px; border-radius: 50%"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="[loginStore?.userInfo?.avatar]"
        show-progress
        :initial-index="4"
        fit="fill"
      >
        <template #error>
          <div class="image-slot">
            <el-icon size="32"><Picture /></el-icon>
          </div>
        </template>
      </el-image>

      <!-- 消息中心 -->
      <el-tooltip
        effect="dark"
        content="消息中心"
        placement="bottom"
        :hide-after="0"
      >
        <el-badge :value="99" class="ml-[15px]" @click="messageCenter">
          <el-icon size="22" color="#6776b3">
            <BellFilled />
          </el-icon>
        </el-badge>
      </el-tooltip>

      <!-- 全屏 -->
      <el-tooltip
        effect="dark"
        :content="isFullScreen ? '退出全屏' : '全屏'"
        placement="bottom"
        :hide-after="0"
      >
        <el-icon size="22" color="#6776b3" class="ml-[20px]">
          <FullScreen @click="fullScreen" />
        </el-icon>
      </el-tooltip>

      <!-- 退出登录 -->
      <el-dropdown trigger="click" @command="clickDropdown">
        <el-icon size="22" color="#666666" class="ml-[20px]">
          <SwitchButton />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :icon="item.icon"
              :command="item.command"
              v-for="item in dropdownList"
              :key="item.label"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <UserInfo ref="userInfoRef"></UserInfo>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { toggleFull } from "be-full";
import { useRouter } from "vue-router";
import { useLogin } from "@/store/modules/login";
import { useMenus } from "@/store/modules/menus";
import { useVModel } from "@vueuse/core";
import { ArrowLeft, FullScreen, User } from "@element-plus/icons-vue";
import UserInfo from "../userInfo/index.vue";
import { ElNotification } from "element-plus";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: () => false,
  },
});

const userInfoRef = ref<InstanceType<typeof UserInfo> | null>(null);

const dropdownList = [
  {
    label: "个人中心",
    icon: User,
    command: "user",
  },
  {
    label: "退出登录",
    icon: ArrowLeft,
    command: "quit",
  },
];

const emits = defineEmits(["update:isCollapse"]);

const router = useRouter();

const isFullScreen = ref(false);
const isMCollapse = useVModel(props, "isCollapse", emits);

const loginStore = useLogin();
const MenuStore = useMenus();

const toggleIsCollapse = () => {
  isMCollapse.value = !isMCollapse.value;
};

/**
 * 消息中心
 */
const messageCenter = () => {
  ElNotification({
    title: "消息中心",
    message: "待开发, 敬请期待~",
    duration: 0,
  });
};

/**
 * 全屏展示
 */
const fullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
  toggleFull();
};

/**
 * 退出登录
 */
const logout = () => {
  loginStore.clearUserInfo();
  MenuStore.clearMenus();
  router.replace("/login");
};

/**
 * 显示个人信息
 */
const showUserInfo = () => {
  userInfoRef.value?.open();
};

interface Events {
  quit: () => void;
  user: () => void;
}

const clickDropdown = (type: keyof Events) => {
  const events: Events = {
    quit: logout,
    user: showUserInfo,
  };
  events[type]();
};
</script>

<style lang="scss" scoped></style>
