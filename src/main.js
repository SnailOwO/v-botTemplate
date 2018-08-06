// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'router/index'
import iView from 'iview'
import {nativeAxios,httpRequest} from 'api/axios_config'
import i18n from 'langs/lang'
import 'iview/dist/styles/iview.css'
import 'src/css/common.less'
import echarts from 'echarts'
import store from 'store/index'

Vue.use(iView)
  
Vue.prototype.$http = httpRequest;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = nativeAxios;

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
