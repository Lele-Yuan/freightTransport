// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Lib from '@/service/Lib'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import _vueDirective from '@/utils/vueDirective' //指令相关
import urlHelper from '@/utils/urlHelper.js'
import 'babel-polyfill'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js' 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// FastClick.attach(document.body);
Vue.use(ElementUI);

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

Vue.config.productionTip = false

sync(store, router);

//路由控制，用来处理一些全局状态
router.beforeEach((to, from, next) => {
  let meta = to.matched[0].meta
  let headerTitle = meta.headerTitle===undefined?'国际货代专家': meta.headerTitle

/*测试本地修改*/

    /* 设置页面title内容 兼容ios更改title*/
    setTimeout(function(){
        //利用iframe的onload事件刷新页面
        document.title = headerTitle;
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    },0);


  // 控制显示title
  store.commit('setHeaderTitle',headerTitle)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 执行初始化工作
store.dispatch('init')
