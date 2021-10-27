import { createApp, createVNode } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import { store, key } from '@/store/index'
import '@/styles/index.scss'
import * as icons from '@element-plus/icons'
const app = createApp(App)
app.use(router).use(store, key).mount('#app')

// 动态图标组件配置

// 方式一
Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})

// 方式二
// const Icon = props => {
//   const { icon } = props
//   return createVNode(icons[icon])
// }
// app.component('Icon', Icon)
