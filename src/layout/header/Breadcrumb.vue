<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: item.path }" v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import type { RouteLocationMatched } from 'vue-router'
  import { ref, watch } from 'vue'
  import type { Ref } from 'vue'
  const route = useRoute()

  const tabs: Ref<RouteLocationMatched[]> = ref([])

  const getBreadcrumb = () => {
    let breadcrumbs = route.matched.filter(item => item.meta && item.meta.title)
    const first = breadcrumbs[0]
    if (first.path !== '/dashboard') {
      breadcrumbs = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(breadcrumbs)
    }
    tabs.value = breadcrumbs
  }
  getBreadcrumb()
  watch(
    () => route.path,
    () => getBreadcrumb()
  )
</script>
<style scoped lang="scss"></style>
