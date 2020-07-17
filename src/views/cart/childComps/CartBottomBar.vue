<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'


  export default {
    name:'CartBottomBar',
    components:{
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '¥' + this.cartList.filter(item => {
          return item.checked}).reduce((pre,item) => {
            return pre + item.price * item.count
          },0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //使用数组的高阶函数find
        if(this.cartList.length === 0) {
          return false
        }else{
          return !this.cartList.find(item => !item.checked)
        }
        //基础写法：遍历
        // for(let item of this.cartList){
        //   if(!item.checked) {
        //     return false
        //   }
        //   return true
        // }
      },
      checkClick() {
        if(this.isSelectAll) { //全选
          this.cartList.forEach(item => item.checked = false)
        }else{ //部分不选或都不选
          this.cartList.forEach(item => item.checked = true)
        }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    font-size: 14px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
  }
</style>