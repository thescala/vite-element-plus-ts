<template>
  <component class="icons" @click="changeIcon" :is="status ? 'Expand' : 'Fold'" />
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useStore } from '@/store/index'

  const store = useStore()
  const status = computed(() => {
    return store.getters['getCollapse']
  })

  const changeIcon = () => {
    store.commit('setCollapse', !status.value)
  }
</script>
<style scoped lang="scss">
  .icons {
    // vertical-align: middle;
    margin-right: 10px;
    height: 18px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }
</style>
