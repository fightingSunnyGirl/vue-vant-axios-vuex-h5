import router from '../../../router'
import { get } from '../../../axios'
/**
 * 微信分享
 * config =>为对象 配置分享标题 图片 url等 
 * {
 * title:"在吗？刚在这里领了个好货！亲测真实，每月都可以不花钱领百件好货！",//标题
 * desc:"每天只需要花1分钟帮商家做任务即可，超级简单哟~",//副标题
 * imgUrl:"https://s0.laqu.com/laqu/images/img1526491015502_730.png",//图片 代言人页面的链接 和 商品详情页的 动态传入 其他的用网站logo
 * link:"分享的出去的链接",  //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 默认当前页面
 * }
 * 
 * routerName => 路由名字
 * */
function wxShareHandle(currentPage, config = {
  title: "在吗？刚在这里领了个好货！亲测真实，每月都可以不花钱领百件好货！",
  desc: "每天只需要花1分钟帮商家做任务即可，超级简单哟~",
  imgUrl: "https://s0.laqu.com/laqu/images/img1526491015502_730.png",
}) {

  // 非微信环境 不走
  if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger") {
    return;
  }
  let url = encodeURI(currentPage);
  get("trial.h5.wechat.js.sdk.config.get", {
    url: url
  }).then(res => {
    if (res.data && res.data.code == 200) {
      let appConfig = res.data.data;
      wx.config({
        debug: false,
        appId: appConfig.appId, // 必填，公众号的唯一标识测试 x
        timestamp: appConfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: appConfig.nonceStr, // 必填，生成签名的随机串
        signature: appConfig.signature,// 必填，签名，见附录1
        jsApiList: [// 必填，需要使用的JS接口列表
          'onMenuShareTimeline', //分享到朋友圈
          'onMenuShareAppMessage', //分享到朋友
          'onMenuShareQQ', //分享到qq
          'onMenuShareQZone'//分享到朋友圈
        ]
      });
      wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      });
      wx.ready(function () {
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: config.title,
          desc: config.desc,
          link: '',
          imgUrl: config.imgUrl,
          success: function () {
            // 用户确认分享后 商品详情页 和代言人页面分享出去的要做统计
          },
          cancel: function () {
          }
        });
        //分享到朋友
        wx.onMenuShareAppMessage({
          title: config.title,
          desc: config.desc,
          link: '',
          imgUrl: config.imgUrl,
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        //分享到QQ
        wx.onMenuShareQQ({
          title: config.title,
          desc: config.desc,
          link: '',
          imgUrl: config.imgUrl,
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        //分享到QQ空间
        wx.onMenuShareQZone({
          title: config.title,
          desc: config.desc,
          link: '',
          imgUrl: config.imgUrl,
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }
  })
}

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

// 除了详情页和代言人页面 其他页面分享配置
export function shareInit() {
  router.afterEach((to, from) => {
    if (to.name != 'goodsDetails' && to.name != 'goodsDetailsV2' && to.name != 'spokesmanShare') {
      wxShareHandle(document.location.origin + to.fullPath)
    }
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