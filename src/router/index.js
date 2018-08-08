import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
          meta: { auth: true },
          component: resolve => require(['../components/index/index'], resolve),
        },
        {
          path: 'sys',
          name: 'systemSet',
          meta: { auth: true },
          component: resolve => require(['../pages/sysSet'], resolve),
        },
        {
          path: 'role',
          name: 'roleManage',
          meta: { auth: true },
          component: resolve => require(['../pages/sysSet'], resolve),
        },
        {
          path: 'user',
          name: 'userManage',
          meta: { auth: true },
          component: resolve => require(['../pages/sysSet'], resolve),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  //todo: 验证用户,不仅仅是用token,后续可能还需修改
  let token  = sessionStorage.getItem('token');
  if(to.matched.some(record => record.meta.auth)) {
    if(!token) {
      next({ path: '/login' });
    } 
  }
  next();
})

export default router;
