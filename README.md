## 创建 repository 并初始化

```
echo "# vite-element-plus-ts" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/thescala/vite-element-plus-ts.git
git push -u origin main
```

```
git remote add origin https://github.com/thescala/vite-element-plus-ts.git
git branch -M main
git push -u origin main
```

## 创建 vite-element-plus 项目

```sh
npm init vite@latest vite-element-plus -- --template vue
cd vite-element-plus
npm install
npm run dev
```

## 配置服务地址和端口

在'vite.config.js'中配置

```js
export default defineConfig({
  // ....省略其他
  // 配置前端服务地址和端口
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: false,
    open: true
  }
  // ....省略其他
})
```

## vite 配置别名

```sh
npm install @types/node -D
```

在'vite.config.js'中配置别名

```js
import path from 'path'
export default defineConfig({
  // ....省略其他
  resolve: {
    alias: {
      // '~/': `${path.resolve(__dirname, 'src')}/`
      // 配置别名，在引入资源时，可以用“@/”直接访问
      '@': path.resolve(__dirname, 'src')
    }
  }
  // ....省略其他
})
```

或者

```
alias: [
      {
        // '~/': `${path.resolve(__dirname, 'src')}/`
        // 配置别名，在引入资源时，可以用“@/”直接访问
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
```

详细配置可参考：

https://vitejs.dev/config/

https://juejin.cn/post/6941641892840865805

## 添加路由

```sh
npm i vue-router@4
```

添加路由配置

在`src`目录下创建`router`文件夹，在`router`文件夹下创建`index.ts`, 具体配置如下：

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/HelloWorld.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Layout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
```

然后在 main.js 中添加配置

```sh
import router from './router/index'
- createApp(App).mount('#app')
+ createApp(App).use(router).mount('#app')
```

## 忽略 ts 错误提示

在红波浪线代码上方添加`// @ts-ignore`

## 安装 vuex

```sh
npm install vuex@next --save
或者
yarn add vuex@next --save
```

配置 vuex

官方文档：

- 3.x: https://vuex.vuejs.org/zh/
- 4.x: https://next.vuex.vuejs.org/zh/

在`src`目录下创建`store/index.ts`文件

```ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    // 定义变量
    count: 0
  },
  mutations: {
    //
    increment(state: State, count: number) {
      // 变更状态
      state.count = count
    }
  },
  getters: {
    // 获取变量值
    getCount(state: State) {
      return state.count
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}
```

然后再`main.js`中配置 store

```js
import { store, key } from './store/index'
;-createApp(App).use(router).mount('#app') + createApp(App).use(router).use(store, key).mount('#app')
```

## 安装 eslint，css

```
npm i eslint eslint-plugin-vue -D
```

在根目录下配置`.eslintrc.js`文件

```js
// http://eslint.cn/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-strongly-recommended', 'plugin:vue/vue3-recommended'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': [2, 'never']
  }
}
```

## 安装 css 预处理 sass

```sh
npm install -D sass sass-loader
```

## 安装 element-plus

```sh
npm install element-plus
```

element-plus 配置参考：https://element-plus.gitee.io/zh-CN/guide/quickstart.html

至此基础配置基本完成。

csdn 需要关注博主解决办法：
在 style 中添加下面两行代码

```
/* 不登录阅读全文 */
.article_content{height:auto!important}
.hide-article-box{display:none!important}

/* 去掉上面的提示关闭广告插件框，以及提示登录框，还有广告 */
.pulllog-box,.adblock,.mediav_ad{display:none!important}

/* 去掉侧边栏，下方推荐，联系我们 */
.recommend-right,aside,.tool-box,.recommend-box{display:none!important}
main{width:100%!important}

/* 去掉右下角框框 */
.meau-gotop-box{display:none!important}

.indexSuperise{display:none!important}

.comment-list-box{max-height:none!important}
```

## Typescript 类型报错问题

```ts
import { Ref } from 'vue' // “Ref”仅表示类型，但在此处却作为值使用。
// 解决办法
import type { Ref } from 'vue' // corrent
```

## process is not defined

使用 `vite` 安装 `vue3` 时，如果使用了 `process.env`，会遇到 `process` 未定义的情况，原因是 `process.env` 已经被移除了。解决办法是在 `vite.config.ts` 中增加 `define`：

```js
import { defineConfig } from 'vite'
// ...

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  define: { 'process.env': {} }
  // ...
})
```
