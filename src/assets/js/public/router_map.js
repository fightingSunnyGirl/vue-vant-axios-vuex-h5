import router from '@routes/index';

export function handleRouter() {
  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面meta信息title */
    if (to.meta.content) {
      let head = document.getElementsByTagName('head');
      let meta = document.createElement('meta');
      document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords)
      document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
      meta.content = to.meta.content;
      head[0].appendChild(meta)
    }
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  })
}

// 定时刷新页面
export let refreshPage = {
  created() {
    let time = this.$route ? this.$route.query.refresh : '';
    if (time) {
      setTimeout(() => {
        location.reload()
      }, time + '000');
    }
  }
}