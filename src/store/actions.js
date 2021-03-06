
import {ADD_COUTER,ADD_CART} from './mutation-types'


export default {
  addCart(context,payload){
    return new Promise((resolve)=>{
      //加一个判断，查找已存在的商品，不再重复添加而是将数量加一
    //利用for循环
    // let oldProduct = null
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // };
    //使用数组的方法更简单
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if(oldProduct) {
      // oldProduct.count += 1 修改state的操作仍然只能在mutations中，这里不可以直接修改state
      context.commit(ADD_COUTER,oldProduct)
      resolve('该商品数量+1')
    }else{
      payload.count = 1
      // state.cartList.push(payload)  ,同理
      context.commit(ADD_CART,payload)
      resolve('新商品已添加')
    }
    })
  }
}