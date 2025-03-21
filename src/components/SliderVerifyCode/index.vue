<template>
  <!-- 滑动验证码组件 -->
  <Vcode :show="showCode" @success="onSuccess" @close="onClose" />
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import Vcode from "vue3-puzzle-vcode";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: () => false,
  },
});

const emits = defineEmits(["update:isShow", "codeSuccess"]);

const showCode = useVModel(props, "isShow", emits);

const onClose = () => {
  showCode.value = false;
};

const onSuccess = () => {
  onClose();
  emits("codeSuccess");
};
</script>

<style lang="scss" scoped></style>
