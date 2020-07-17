<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车</div> -->
      <!-- 这个是vue现在推荐的写法，上面这个写法已近淘汰 -->
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar />

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  
  import {mapGetters} from 'vuex'

  export default {
    name:'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
        ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .cart {
    height: 100vh;
  }
</style>