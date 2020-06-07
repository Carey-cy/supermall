<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from 'network/home.js'
  import HomeSwiper from './childComps/HomeSwiper'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper
    },
    data() {
      return {
        banners:[],
        recommends:[]
        // dkeyword:[],
        // keywords:[]
        // result:null
      }
    },
    created(){
      //请求多个数据
      getHomeMultidata().then(res=>{    
        // this.result = res
        // console.log(res);
        
        
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list
        console.log(this.banners);
        // this.dkeyword = res.data.dkeyword.list
        // this.keywords = res.data.keywords.list
      })
    }
  }
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>