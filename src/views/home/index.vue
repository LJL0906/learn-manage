<template>
  <div>123</div>
</template>

<script lang="ts" setup>
import { useMenus } from "@/store/modules/menus";
const menusStore = useMenus();

menusStore.setMenus([
  {
    name: "home",
  },
  {
    name: "about",
  },
]);
</script>

<style lang="scss" scoped></style>
