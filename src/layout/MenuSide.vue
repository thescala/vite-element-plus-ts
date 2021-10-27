<template>
  <MenuLogo v-if="!isCollapse"></MenuLogo>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    background-color="#252526"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script setup lang="ts">
  // @ts-ignore
  import MenuItem from '@/layout/menuside/MenuItem.vue'
  import MenuLogo from '@/layout/menuside/MenuLogo.vue'
  import { ref, reactive, computed } from 'vue'

  import { useRoute } from 'vue-router'
  import { useStore } from '@/store/index'

  const route = useRoute()
  const activeIndex = computed(() => {
    const { path } = route
    return path
  })

  const store = useStore()
  const isCollapse = computed(() => {
    return store.getters['getCollapse']
  })

  const handleOpen = (key: string | number, keyPath: string) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string | number, keyPath: string) => {
    console.log(key, keyPath)
  }

  let menuList = reactive([
    {
      path: '/dashboard',
      component: 'Layout',
      meta: {
        title: '首页',
        icon: 'el-icon-s-home',
        roles: ['sys:manage']
      },
      children: []
    },
    {
      path: '/system',
      component: 'Layout',
      alwaysShow: true,
      name: 'system',
      meta: {
        title: '系统管理',
        icon: 'Menu',
        roles: ['sys:manage'],
        parendId: 0
      },
      children: [
        {
          path: '/department',
          component: '/system/dept/department',
          alwaysShow: false,
          name: 'department',
          meta: {
            title: '部门管理',
            icon: 'el-icon-s-home',
            roles: ['sys:dept'],
            parentId: 17
          },
          children: []
        },
        {
          path: '/userList',
          component: '/system/user/userList',
          alwaysShow: false,
          name: 'userList',
          meta: {
            title: '用户管理',
            icon: 'el-icon-s-custom',
            roles: ['sys:user'],
            parentId: 17
          },
          children: []
        },
        {
          path: '/roleList',
          component: '/system/role/roleList',
          alwaysShow: false,
          name: 'roleList',
          meta: {
            title: '角色管理',
            icon: 'el-icon-s-tools',
            roles: ['sys:role'],
            parentId: 17
          },
          children: []
        },
        {
          path: '/menuList',
          component: '/system/menu/menuList',
          alwaysShow: false,
          name: 'nemuList',
          meta: {
            title: '权限管理',
            icon: 'el-icon-document',
            roles: ['sys:menu'],
            parentId: 17
          },
          children: []
        }
      ]
    },
    {
      path: '/goods',
      component: 'Layout',
      alwaysShow: false,
      name: 'goods',
      meta: {
        title: '商品管理',
        icon: 'el-icon-document',
        roles: ['sys:goods'],
        parentId: 0
      },
      children: [
        {
          path: '/goodsCategory',
          component: '/goods/goodsCategory/goodsCategoryList',
          alwaysShow: false,
          name: 'goodsCategory',
          meta: {
            title: '商品分类',
            icon: 'el-icon-document',
            roles: ['sys:goodsCategory'],
            parentId: 17
          },
          children: []
        }
      ]
    },
    {
      path: '/systemConfig',
      component: 'Layout',
      alwaysShow: false,
      name: 'systemConfig',
      meta: {
        title: '系统工具',
        icon: 'el-icon-document',
        roles: ['sys:systemConfig'],
        parentId: 0
      },
      children: [
        {
          path: '/document',
          component: '/goods/goodsCategory/goodsCategoryList',
          alwaysShow: false,
          name: 'document',
          meta: {
            title: '接口文档',
            icon: 'el-icon-document',
            roles: ['sys:document'],
            parentId: 17
          },
          children: []
        }
      ]
    }
  ])
</script>

<style>
  .el-menu-vertical {
    border: none;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
