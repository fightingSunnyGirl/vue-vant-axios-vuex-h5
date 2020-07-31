import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    a: 'XXX',
  },
  mutations: {
    handleDateInstance(state,obj){
      state.a = 'XXXX'
    },
  },
  actions: {

  }
})
