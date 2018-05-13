import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Url from '../components/Url'
import Pay from '../components/Pay'
import Amount from '../components/Amount'
import Result from '../components/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        showBack: false
      }
    },
    {
      path: '/url',
      name: 'url',
      component: Url,
      meta: {
        title: '参数设置',
        showBack: true
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta: {
        title: '扫码支付',
        showBack: true
      }
    },
    {
      path: '/amount',
      name: 'amount',
      component: Amount,
      props: true,
      meta: {
        title: '输入金额',
        showBack: true
      }
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
      props: true,
      meta: {
        title: '支付结果',
        showBack: true
      }
    },
  ]
})
