import { Dialog } from "vant";
import store from './store';
export function alert(message) {
  let a = 0;
  var ioskey = function () {
    setTimeout(function () {
      for (var i = 0; i < window.document.getElementsByTagName("input").length; i++) {
        window.document.getElementsByTagName("input")[i].blur();
      }
    }, 0)
  }
  document.body.addEventListener('focusin', (e) => {  //软键盘弹起事件
    if (a == 0) {
      ioskey();
    }
  }, false);
  return Dialog.alert({
    message: message,
    className: 'dialog',
    confirmButtonText: '确定',
    confirmButtonColor: '#e21445',
  }).then(() => {
    a = 1;
    clearTimeout(ioskey);
    if (store.state.loginStatus == false && message === "登录超时，请重新登录！") {
      store.commit("authLoginMsg");
    }
  })
}

export function inputClick() {
  var u = navigator.userAgent;
  var flag;
  var myFunction;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    document.body.addEventListener('focusin', () => {  //软键盘弹起事件
      flag = true;
      clearTimeout(myFunction);
    })
    document.body.addEventListener('focusout', () => { //软键盘关闭事件
      flag = false;
      if (!flag) {
        myFunction = setTimeout(function () {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" })//重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)
        }, 200);
      } else {
        return
      }
    })
  }
  else if (isAndroid) {
    var windheight = window.screen.height;  /*未唤起键盘时当前窗口高度*/
    window.addEventListener('resize', () => {
      let docheight = window.innerHeight;
      /*唤起键盘时当前窗口高度*/
      if (windheight - docheight>200) {
              /*当唤起键盘高度小于未唤起键盘高度时执行*/
        if (document.getElementsByClassName("login_fast")[0]) {
          document.getElementsByClassName("login_fast")[0].style.position = 'static';
        }
      } else {
        if (document.getElementsByClassName("login_fast")[0]) {
          document.getElementsByClassName("login_fast")[0].style.position = 'fixed';
        }
      }
    });
  }else {
    return
  }
}