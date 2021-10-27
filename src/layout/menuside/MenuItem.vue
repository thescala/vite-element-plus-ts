<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0">
      <template #title>
        <i :class="menu.meta.icon" v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')"></i>
        <!-- 动态图标组件使用 -->
        <!-- 方式一 -->
        <component class="icons" :is="menu.meta.icon" v-else></component>
        <!-- 方式二 -->
        <!-- <Icon class="icons" :icon="menu.meta.icon" v-else></Icon> -->
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item :index="menu.path" v-else>
      <i :class="menu.meta.icon" v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')"></i>
      <!-- 动态图标组件使用 -->
      <!-- 方式一 -->
      <component class="icons" :is="menu.meta.icon" v-else></component>
      <!-- 方式二 -->
      <!-- <Icon class="icons" :icon="menu.meta.icon" v-else></Icon> -->
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
  defineProps(['menuList'])
</script>
<style scoped lang="scss">
  .icons {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    height: 18px;
    text-align: center;
    font-size: 18px;
  }
</style>
