// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import iView from 'iview'
import axios from './axios'
import 'iview/dist/styles/iview.css'
import 'src/css/common.less'

Vue.use(iView)
Vue.use(axios)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
