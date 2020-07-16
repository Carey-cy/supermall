import {ADD_COUTER,ADD_CART} from './mutation-types'

export default {
  //mutatios的唯一目的就是修改state中的状态
  //mutations中的每个方法都尽可能的单一一点，为了devtools方便追踪
  [ADD_COUTER](state,payload) {
    payload.count++
  },
  [ADD_CART](state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}