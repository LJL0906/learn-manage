<template>
  <div
    class="w-full h-[64px] flex justify-between items-center px-[10px] border border-b border-[var(--el-menu-border-color)] pr-[32px]"
  >
    <div class="cursor-pointer" @click="toggleIsCollapse">
      <el-icon size="26" color="#6776b3" v-if="isMCollapse"><Expand /></el-icon>
      <el-icon size="26" color="#6776b3" v-else> <Fold /></el-icon>
    </div>

    <div class="w-fit flex justify-center items-center cursor-pointer">
      <img
        :src="loginStore?.userInfo?.avatar"
        alt=""
        class="mr-[15px] w-[32px] h-[32px] rounded-full"
      />
      <el-icon size="22" color="#6776b3" class="mr-[15px]"
        ><BellFilled
      /></el-icon>
      <el-dropdown trigger="click" @command="clickDropdown">
        <el-icon size="22" color="#666666"><SwitchButton /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="quit" :icon="ArrowLeft">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useLogin } from "@/store/modules/login";
import { useVModel } from "@vueuse/core";
import { ArrowLeft } from "@element-plus/icons-vue";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: () => false,
  },
});

const emits = defineEmits(["update:isCollapse"]);

const router = useRouter();

const isMCollapse = useVModel(props, "isCollapse", emits);

const loginStore = useLogin();

const toggleIsCollapse = () => {
  isMCollapse.value = !isMCollapse.value;
};

/**
 * 退出登录
 */
const logout = () => {
  loginStore.clearUserInfo();
  router.replace("/login");
};

interface Events {
  quit: () => void;
}

const clickDropdown = (type: keyof Events) => {
  const events = {
    quit: logout,
  };
  events[type]();
};
</script>

<style lang="scss" scoped></style>
