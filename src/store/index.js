import Vue from 'vue'
import Vuex from 'vuex'

//1.安装vuex
Vue.use(Vuex)

//2.创建store对象
export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      //加一个判断，查找已存在的商品，不再重复添加而是将数量加一
      //利用for循环
      // let oldProduct = null
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // };
      //使用数组的方法更简单
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct) {
        oldProduct.count += 1
      }else{
        payload.count = 1
        state.cartList.push(payload)  
      }

    }
  },
  actions: {
  },
  modules: {
  }
})
