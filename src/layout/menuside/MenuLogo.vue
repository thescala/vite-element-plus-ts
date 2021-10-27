<template>
  <div class="logo">
    <img :src="logoUrl" alt="vue" />
    <span class="title">vite-element-plus</span>
  </div>
</template>
<script setup lang="ts">
  // @ts-ignore
  import img from '@/assets/logo.png'
  const logoUrl = img
</script>
<style lang="scss">
  .logo {
    background-color: #24a14a;
    height: 50px;
    border: none;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: #fff;
    img {
      margin-right: 12px;
      vertical-align: middle;
      margin-right: 5px;
      width: 18px;
      height: 18px;
      text-align: center;
      font-size: 18px;
    }
    span {
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
</style>
