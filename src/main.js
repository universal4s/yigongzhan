// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import '../node_modules/bootstrap/dist/js/bootstrap'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Animate from 'animate.css'
import axios from 'axios'
import bootstrap from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(bootstrap)
var ax = axios.create({
  baseURL: 'http://www.biggsai.com',
  withCredentials: true
})
Vue.prototype.$axios = ax
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
