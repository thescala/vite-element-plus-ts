import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import Layout from '@/layout/Layout.vue'
const routes:Array<RouteRecordRaw> = [
  {
    path:'/',
    name: 'home',
    component: Layout,
    redirect:'/dashboard',
    children:[
      {
        path:'/dashboard',
        // @ts-ignore
        component:()=> import('@/layout/main/Dashboard.vue'),
        meta:{
          title:'首页',
          icon : '#icondashboard'
        }
      }
    ]
  },
  {
    path:'/system',
    name: 'system',
    component: Layout,
    redirect:'/department',
    meta:{
      title:'系统管理',
      icon:'el-icon-menu',
      roles:['sys:manage'],
      parentId:0
    },
    children:[
      {
        path:'/department',
        // @ts-ignore
        component:()=> import('@/layout/main/system/Department.vue'),
        name:'department',
        meta:{
          title:'机构管理',
          icon:'el-icon-document',
          roles:['sys:dept']
        }
      },
      {
        path:'/userList',
        // @ts-ignore
        component:()=> import('@/layout/main/system/UserList.vue'),
        name:'userList',
        meta:{
          title:'用户管理',
          icon:'el-icon-s-custom',
          roles:['sys:user']
        }
      },
      {
        path:'/roleList',
        // @ts-ignore
        component:()=> import('@/layout/main/system/RoleList.vue'),
        name:'roleList',
        meta:{
          title:'角色管理',
          icon:'el-icon-s-tools',
          roles:['sys:roles']
        }
      },
      {
        path:'/menuList',
        // @ts-ignore
        component:()=> import('@/layout/main/system/MenuList.vue'),
        name:'menuList',
        meta:{
          title:'权限管理',
          icon:'el-icon-document',
          roles:['sys:menu']
        }
      }
    ]
  },
  {
    path:'/goods',
    component:Layout,
    name:'goods',
    redirect:'/goodsCategory',
    meta:{
      title:'商品管理',
      icon:'el-icon-document',
      roles:['sys:goods']
    },
    children:[
      {
        path:'/goodsCategory',
        // @ts-ignore
        component: ()=>import('@/layout/main/goods/GoodCategory.vue'),
        name:'goodsCategory',
        meta:{
          title:'商品管理',
          icon:'el-icon-document',
          roles:['sys:goodsCategory']
        }
      }
    ]
  },
  {
    path:'/systemConfig',
    component:Layout,
    name:'systemConfig',
    redirect:'/document',
    meta:{
      title:'系统工具',
      icon:'el-icon-document',
      roles:['sys:systemConfig']
    },
    children:[
      {
        path:'/document',
        // @ts-ignore
        component: ()=>import('@/layout/main/config/SystemConfig.vue'),
        name:'systemConfig',  
        meta:{
          title:'接口管理',
          icon:'el-icon-document',
          roles:['sys:document']
        }
      }
    ]
  }
]

const router = createRouter({
  
  // history:createWebHistory(process.env.BASE_URL),
  // hash
  history:createWebHashHistory(),
  routes
})
export default router
