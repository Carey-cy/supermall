import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

//1.安装vuex
Vue.use(Vuex)

//2.创建store对象
export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations,
  actions,
  modules: {
  }
})
