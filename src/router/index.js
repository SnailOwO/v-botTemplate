import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',   //去除url自动带有#
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/',
      component: resolve => require(['../pages/mainLayout'], resolve),
      children: [
        {
          path: '/',
          name: 'index',
          component: resolve => require(['../components/index/index'], resolve),
        },
        {
          path: 'sys',
          name: 'systemSet',
          component: resolve => require(['../pages/sysSet'], resolve),
        },
        {
          path: 'role',
          name: 'roleManage',
          component: resolve => require(['../pages/sysSet'], resolve),
        },
        {
          path: 'user',
          name: 'userManage',
          component: resolve => require(['../pages/sysSet'], resolve),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      // meta: { auth: false },
      component: resolve => require(['../pages/login'], resolve)
    }
  ]
})
