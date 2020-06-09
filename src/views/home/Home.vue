<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行','新款','精选']" />

    <ul>
      <li>1hj</li>
      <li>2hj</li>
      <li>3hj</li>
      <li>4hj</li>
      <li>5hj</li>
      <li>6hj</li>
      <li>7hj</li>
      <li>8hj</li>
      <li>9hj</li>
      <li>10hj</li>
      <li>1dd</li>
      <li>2dd</li>
      <li>3dd</li>
      <li>4dd</li>
      <li>5dd</li>
      <li>6dd</li>
      <li>7dd</li>
      <li>8dd</li>
      <li>9dd</li>
      <li>10dd</li>
      <li>11dd</li>
      <li>12dd</li>
      <li>13dd</li>
      <li>14dd</li>
      <li>15dd</li>
      <li>16dd</li>
      <li>17dd</li>
      <li>18dd</li>
      <li>19dd</li>
      <li>20dd</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabcontrol/TabControl';

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import {getHomeMultidata} from 'network/home.js';

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
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