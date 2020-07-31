import { Dialog } from "vant";
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
    // 重新登录
    // if (store.state.loginStatus == false && message === "登录超时，请重新登录！") {
    //   store.commit("authLoginMsg");
    // }
  })
}