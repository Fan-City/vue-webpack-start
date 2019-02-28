import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404') },
  {
    path: '/',
    component: Layout,  // 通用模版
    name: 'home', 
    redirect: '/home', // 跳转路由
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index')
      }
    ]
  },
  { path: '*', redirect: '/404' }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }), // 在 HTML5 history 模式，切换到新路由时，页面滚到顶部或者保持原先的滚动位置
  routes: constantRouterMap
})
