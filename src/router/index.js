
import Vue from 'vue'
import Router from 'vue-router'

import index  from '@/page/index'
import login  from '@/page/login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index
    },
    
  ]
})
