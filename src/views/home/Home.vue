<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll';
  import TabControl from 'components/content/tabcontrol/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';
  

  import {getHomeMultidata,getHomeGoods} from 'network/home.js';

  export default {
    name: 'Home',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    data() {
      return {
        // result:null
        banners:[],
        recommends:[],
        
        goods: {
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType: 'pop'
      }
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /** 
       * 事件监听相关方法
      */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      /** 
       * 网络请求相关方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res=>{    
        // this.result = res
        // console.log(res); 
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list
        // console.log(this.banners);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1
        })
      }
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    position: relative;
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
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    right:0;
    left:0;
  }
</style>