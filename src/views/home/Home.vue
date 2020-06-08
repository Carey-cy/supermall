<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
    <feature-view />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';
  import {getHomeMultidata} from 'network/home.js';
 

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
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
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>