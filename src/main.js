// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui' // 完整引入 Element
//import { Button } from 'element-ui'; // 按需引入 Element
import '../theme/index.css' //主题样式

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 } //项目中所有拥有 size 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000
Vue.use(ElementUI) // 完整引用 Element
//Vue.use(Button) // 按需引用 Element
//Vue.prototype.$message = Message // 绑定到 Vue 全局，可以使用这种方式调用：this.$message
Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
