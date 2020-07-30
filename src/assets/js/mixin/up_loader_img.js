var upLoaderImg = {
    methods: {
      upLoader (file,number) {//number 1是上传前的验证 2是安卓机型上传的验证
          if(number==1){
            // 检测图片格式
            var type = ['image/jpeg','image/jpg','image/png'];
            if(file.size > 5 *1024*1024){
              this.lineTextPop={text: '图片过大，请裁剪后重新上传！',flag: true };
              this.toast = false;
              return false
            }else if(type.indexOf(file.type)==-1){
              this.lineTextPop={text: '图片仅支持jpeg，jpg，png格式！',flag: true};
              this.toast = false;
              return false;
            }else{
              this.toast = true;
            }
            var flag = true
            return flag;
          }else{
            //安卓不支持 beforeRead 方法
            if(navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1){
              // 检测图片格式
              var type = ['image/jpeg','image/jpg','image/png'];
              if(file.file.size > 5 *1024*1024){
                this.lineTextPop={text: '图片过大，请裁剪后重新上传！',flag: true };
                this.toast = false;
                return false
              }else if(type.indexOf(file.file.type)==-1){
                this.lineTextPop={text: '图片仅支持jpeg，jpg，png格式！',flag: true};
                this.toast = false;
                return false;
              }else{
                this.toast = true;
              }
            }
          }
          
        },
    }
}

export default upLoaderImg;