<template>
  <div class="h-[64px] w-full p-[8px]" @click="toHome">
    <div class="nameplate" :class="isCollapse ? 'retract' : ''">
      <div class="w-[48px] min-w-[48px] flex justify-center">
        <img
          src="@/assets/images/manage.png"
          alt=""
          class="w-[32px] h-[32px]"
        />
      </div>
      <span class="whitespace-nowrap" v-show="!isCollapse">
        学海无涯苦作舟
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

defineProps({
  isCollapse: {
    type: Boolean,
    default: () => false,
  },
});

const router = useRouter();

const toHome = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
.nameplate {
  width: 100%;
  height: 48px;
  background-color: #6776b3;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  color: #fff;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  cursor: pointer;
  transition: width 0.3s;
}

.retract {
  width: 48px;
}
</style>
