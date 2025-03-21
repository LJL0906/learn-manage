<template>
  <el-menu
    :default-active="path"
    class="el-menu-vertical-demo"
    router
    :unique-opened="true"
    :collapse="isMCollapse"
    active-text-color="#6776b3"
  >
    <template v-for="(m, index) in menusList" :key="m.id">
      <template v-if="m.children && m.children.length">
        <el-sub-menu :index="`${index}`">
          <template #title>
            <el-icon>
              <component :is="m.icon" />
            </el-icon>
            <span>{{ m.name }}</span>
          </template>
          <el-menu-item v-for="cm in m.children" :index="cm.path" :key="cm.id">
            {{ cm.name }}
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="m.path">
          <el-icon>
            <component :is="m.icon" />
          </el-icon>
          <template #title>{{ m.name }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useVModel } from "@vueuse/core";
import { useMenus } from "@/store/modules/menus";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: () => false,
  },
});
const emits = defineEmits(["update:isCollapse"]);

const route = useRoute();
const menuStore = useMenus();
const menusList = computed(() => menuStore.menus);
const isMCollapse = useVModel(props, "isCollapse", emits);

const path = computed(() => route.fullPath);

onUnmounted(() => {
  menuStore.clearCrumbs();
  menuStore.clearMenus();
});
</script>

<style lang="scss" scoped>
:deep(.el-menu-item.is-active) {
  background-color: #6a76af;
  border-radius: 8px;
  color: #fff;
}

:deep(.el-sub-menu.is-active),
:deep(.el-sub-menu.is-opened) {
  .el-sub-menu__title {
    color: #6c76ab;
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  border-radius: 8px;
}
</style>
