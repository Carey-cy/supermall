export default {
  //mutatios的唯一目的就是修改state中的状态
  //mutations中的每个方法都尽可能的单一一点，为了devtools方便追踪
  addCouter(state,payload) {
    payload.count++
  },
  addCart(state,payload) {
    state.cartList.push(payload)
  }
}