import Vue from 'vue'
import iView from 'iview'
import i18n from 'langs/lang'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',   //去除url自动带有#
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/index',
      component: resolve => require(['../pages/mainLayout'], resolve),
      children: [
        {
          path: 'index',
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
          name: 'roleList',
          meta: { auth: true },
          component: resolve => require(['../pages/role'], resolve),
        },
        {
          path: 'user',
          name: 'userList',
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
  iView.LoadingBar.start();
  //todo: 验证用户,不仅仅是用token,后续可能还需修改
  let token  = sessionStorage.getItem('token');
  let user_info = sessionStorage.getItem('user_info');
  if(to.matched.some(record => record.meta.auth)) {
    if(!token || !user_info) {
      next({ path: '/login' });
      iView.Message.warning({
        content: i18n.t('common.info.userInformationFailure'),
        duration: 3
      });  
    } 
  }
  // 当前登录状态。不允许跳转到login页面
  if(to.name === 'login') {
    if(token && user_info) {
      next({ path: from.path });
    } 
  }
  next();
})

router.afterEach(route => {
  iView.LoadingBar.finish();
});

export default router;
