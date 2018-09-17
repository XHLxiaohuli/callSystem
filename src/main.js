// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import cookie from '@/static/js/cookie'
import '@/static/js/mediation.js'


// 本地存储js
import '@/static/js/indexedDB.js'
// 公共js
import '@/static/js/public.js'


import store from './store'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.prototype.$cookie = cookie

// 接口
//window.api = '192.168.5.168:8080';
//线上
window.api ="120.24.102.187:8066";


let util = {

};

util.title = function (title){
  title = title || 'iView admin';
  window.document.title = title;
};

//自动返回首页顶部
router.afterEach((to,from,next) => {

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
  })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data :{
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
});
