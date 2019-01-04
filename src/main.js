import Vue from 'vue'
import {AjaxPlugin, ToastPlugin, AlertPlugin} from 'vux'
import FastClick from 'fastclick'
import store from './vuex/store'
import router from './router'
import App from './App'

Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  store.commit('UPDATE_LOADING', true)
  next()
})

router.afterEach(function () {
  store.commit('UPDATE_LOADING', false)
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
