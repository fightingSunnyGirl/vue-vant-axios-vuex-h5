<template>
  <div class="home_page">
   首页
  </div>
</template>
<script>
  //js统一提到外部 从外部引入 @(别名)直接定位到/src目录下
    import home from '@/assets/js/home/index.js'
    export default {
        ...home,
       components: {//组建
         
       }
    }
   </script>
  <style lang="less" scoped>
    @import '../../assets/css/home/index.less';
  </style>