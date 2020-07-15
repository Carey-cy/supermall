<template>
  <div class="cart">
    <nav-bar>
      <!-- <div slot="center">购物车</div> -->
      <!-- 这个是vue现在推荐的写法，上面这个写法已近淘汰 -->
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  
  import {mapGetters} from 'vuex'

  export default {
    name:'Cart',
    components: {
      NavBar,
    },
    computed:{
        ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>