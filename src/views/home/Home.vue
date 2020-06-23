<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
    :titles="['流行','新款','精选']" 
    @tabClick="tabClick" 
    ref = "tabControl1" 
    class = "tab-control"
    v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @imageLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref = "tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll';
  import TabControl from 'components/content/tabcontrol/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from 'components/content/back-top/BackTop';

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';
  

  import {getHomeMultidata,getHomeGoods} from 'network/home.js';
  import {debounce} from 'common/untils.js';

  export default {
    name: 'Home',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,

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
        currentType: 'pop',
        isShow: false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY: 0
     
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
    mounted() {
      //1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh(),50)
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })
      //2.获取tabControl的offsetTop
      
    },
    destroyed() {
      console.log('xiaohui')
    },
    activated() {
      this.$refs.scroll.bscrollTo(0, this.saveY ,0)
      this.$refs.scroll.refresh()
      // console.log('activated')
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log('deactivated')
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.bscrollTo(0,0)
      },
      contentScroll(position){
        //判断back-top是否显示
        // console.log(position)
        this.isShow = Math.abs(position.y) > 1000;
        //决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },    
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
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

  /* 在使用原生滚动时，使navbar不随着滚动 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>