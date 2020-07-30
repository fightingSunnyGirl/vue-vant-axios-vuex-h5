import '@babel/polyfill';
import Es6Promise from 'es6-promise';
import Vue from 'vue';
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
import FastClick from 'fastclick';
import wx from 'weixin-jsapi';
import 'vant/lib/index.css';
import './assets/css/base/init.css';
import { post, get} from './axios';
import { alert, inputClick } from './util';
import { handleRouter, shareInit, refreshPage } from './assets/js/public/router_map'
import { Lazyload } from 'vant';
import './assets/js/public/eruda.js'
import * as filters from './filters' // 引入全局过滤器
// 监测线上错误
// import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';
// Sentry.init({
//   dsn: 'https://7ce2567b8f5a4816be9858643edcebbc@sentry.io/5176853',
//   integrations: [new Integrations.Vue({Vue, attachProps: true})],
// });


Es6Promise.polyfill()
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// eruda.init();//在移动端控制台调试工具 将此行代码放到页面相对应的js里面就可以

Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$alert = alert;

Vue.use(Vant);
Vue.use(Lazyload);
Vue.mixin(refreshPage)

FastClick.attach(document.body);
// 修复ios聚焦困难问题
FastClick.prototype.focus = function (tragetElement) {
  tragetElement.focus()
}

Vue.config.productionTip = false;
handleRouter();
shareInit();
new Vue({
  router,
  store,
  render: h => h(App),
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.$router.go(0);
      return false;
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    let u = navigator.userAgent;
    if(u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1){
      window.addEventListener("pagehide", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    }else{
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    }
  },
  mounted() {
    inputClick();
  },
}).$mount('#app')
