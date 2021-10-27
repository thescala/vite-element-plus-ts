<template>
  <el-tabs v-model="activeTab" type="card" closable @tab-click="changeTab" @tab-remove="removeTab">
    <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { useStore } from '@/store/index'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import type { TabType } from '@/store/type/TabType'
  import router from '@/router'

  const route = useRoute()

  const store = useStore()

  const tabList = computed(() => {
    return store.getters['getTabs']
  })

  const activeTab = ref('')

  const setActiveTab = () => {
    activeTab.value = route.path
  }
  const addTabs = () => {
    // store.getters['getTabs']
    const { path, meta } = route
    const tab: TabType = {
      path: path,
      title: meta.title as string
    }
    store.commit('addTabs', tab)
  }
  // 监听路由变化
  watch(
    () => route.path,
    () => {
      setActiveTab()
      // 监听添加的tab选项卡
      addTabs()
    }
  )

  // 解决刷新丢失选项卡的问题

  const beforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('tabView', JSON.stringify(tabList.value))
    })
    let tabSession = sessionStorage.getItem('tabView')
    if (tabSession) {
      let oldTabs = JSON.parse(tabSession)
      if (oldTabs.length > 0) {
        store.state.tabs = oldTabs
      }
    }
  }
  onMounted(() => {
    beforeRefresh()
    setActiveTab()
    // 监听添加的tab选项卡
    addTabs()
  })
  const changeTab = (tab: any) => {
    const { props } = tab
    router.push({ path: props.name })
  }
  const removeTab = (targetName: string) => {
    const tabs = tabList.value
    let activeName = activeTab.value
    if (activeName === targetName) {
      tabs.forEach((tab: TabType, index: number) => {
        if (tab.path === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.path
          }
        }
      })
    }
    activeTab.value = activeName
    store.state.tabs = tabs.filter((tab: TabType) => tab.path !== targetName)
    router.push({ path: activeName })
  }
</script>
<style scoped lang="scss"></style>
