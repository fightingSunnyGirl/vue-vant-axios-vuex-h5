import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savePosition) { //记录滚动位置
    if (savePosition) {
      return savePosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = document.body.scrollTop
      }
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        keepAlive: true,
        title: '平台',
        content:{
          keywords:'页面关键词',
          description:'页面描述段落'
        }
      },
      component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
    },
  ]
});

export default router;
