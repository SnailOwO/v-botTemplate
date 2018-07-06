import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',   //去除url自动带有#
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../pages/index'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      // meta: { auth: false },
      component: resolve => require(['../pages/login'], resolve)
    }
  ]
})
