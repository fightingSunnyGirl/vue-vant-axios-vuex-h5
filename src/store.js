import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { post, get } from './axios';
import { alert } from './util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pchttp: 'http://www.laqu.com',
    isWeixin: true,
    loginStatus:false,
    openId: '',
    code: '',
    memberId: '',
    phone: '',
    inviteCode:'',
    bindTypeAliPay: 0,
    identityType: 0,
    realStatus:false,
    changePwdBack: '',
    taoBack: '',
    realTo:'',
    loginBack: '/',
    listStatus:{//非登录页列表状态缓存
      item_name:'',//商品名
      activity_type:'',//商品类型
      reward:'',//是否有奖
      item_category_id:'',//一级分类
      item_category_second_id:'',//二级分类
      sort_type:'',//排序类型 
      sort_enum:'', //desc/asc倒叙正序
    },
    userinfo:{
      avatar:'',
      name:''
    },
    applyhistoryIndex:0 //申请列表的tabindex记录
  },
  mutations: {
    changeListSatus(state,obj){
      // 重置listStatus
       for(let i in state.listStatus){
        state.listStatus[i] = ''
       }
      //赋值
      for(let k in obj){
        state.listStatus[k] = obj[k]
      }
    },
  },
  actions: {

  }
})
