// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import iView from 'iview'
import Routers from './router.js'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css'

Vue.use(VueRouter)
Vue.use(iView)

// Vue.config.productionTip = false

const RouterConfig = {
  routes: Routers
}
const router = new VueRouter(RouterConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
})
