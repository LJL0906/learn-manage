<template>
  <div class="layoutContainer">
    <el-aside>
      <Nnameplate v-model:isCollapse="isCollapse"></Nnameplate>
      <Menus v-model:isCollapse="isCollapse"></Menus>
    </el-aside>
    <el-container>
      <Header v-model:isCollapse="isCollapse"></Header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Menus from "./components/menus/index.vue";
import Nnameplate from "./components/nameplate/index.vue";
import Header from "./components/header/index.vue";

const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
@use "./layout.scss";
</style>
