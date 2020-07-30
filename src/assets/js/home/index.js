export default {
  name: 'home',
  data() {
    return {
      currnetIndex: 0,//分类默认
      loading: false,//加载中
      finished: false,//加载是否结束
    };
  },
  methods: {
    // 获取首页数据
    getData() {
      this.$get('trial.h5.homepage.get').then(res => {
        if (res.data && res.data.code == 200) {
        
        } else {
          this.$alert(res.data.message)
        }
      });

    },
    
  },
  created() {
    
  },
  mounted() {
    
  }
}