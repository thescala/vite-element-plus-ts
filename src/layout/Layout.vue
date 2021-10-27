<template>
  <el-container class="layout">
    <el-aside width="auto" class="aside">
      <MenuSide></MenuSide>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <Tabs></Tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  // @ts-ignore
  import Header from '@/layout/header/Header.vue'
  // @ts-ignore
  import MenuSide from '@/layout/MenuSide.vue'
  import Tabs from '@/layout/main/tabs/Tabs.vue'
</script>
<style lang="scss" scoped>
  // 引用外部scss文件时，要加@，且需在末尾加分号
  .layout {
    height: 100%;
    .aside {
      background-color: #252526;
    }
    .header {
      background-color: rgb(255, 255, 255);
      display: flex;
      align-items: center;
      border-bottom: rgb(172, 171, 246) solid 1px;
    }
    .main {
      background-color: rgb(250, 250, 250);
      padding-top: 0px;
      .el-tabs {
        padding-left: 0;
      }
    }
  }
</style>
