// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'router/index'
import iView from 'iview'
import {nativeAxios,api} from 'api/axios_config'
import i18n from 'langs/lang'
import 'iview/dist/styles/iview.css'
import 'src/css/common.less'
import echarts from 'echarts'

Vue.use(iView)
  
Vue.prototype.$http = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = nativeAxios;

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
