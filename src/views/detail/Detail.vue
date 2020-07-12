<template>
  <div id="detail">
    <detail-nav
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    /> 
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
    >
  
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <!-- <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      /> -->
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      />
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comments"
      />
      <goods-list
        :goods="recommends"
        ref="recommends"
      />
    </scroll>
    <detail-bottom-bar @addCart = "addToCart"/>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template> 

<script>
  import DetailNav from './childComps/DetailNav';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailBottomBar from './childComps/DetailBottomBar';

  import {getDetail,Goods,Shop,GoodsParam,getRecommend,} from 'network/detail.js';
  import {debounce} from 'common/untils.js';
  import {itemLitenerMixin,backTopMixIn} from 'common/mixin.js';

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from 'components/content/back-top/BackTop';


  export default {
    name:'Detail',
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo:{},
        recommends: [],
        // itemImgLisener: null  和home.vue共有，放入混入中
        themeTopYs:[],
        getThemeTopYs: null,
        currentIndex: 0,
        
      }
    },
    mixins:[itemLitenerMixin,backTopMixIn],
    components: {
      DetailNav,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      
      Scroll,
      GoodsList,
      
    },
    methods: {
      imageLoad() {
        // this.newRefresh()
        console.log("scorll",this.$refs.scroll.refresh())
        this.$refs.scroll.refresh()
       console.log(this.$refs.scroll.getScrollY())
      //  this.getThemeTopYs()
      },
      titleClick(index){
        // console.log(/index)
        this.$refs.scroll.bscrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position) {
        //1,获取y
        const positionY = -position.y
        // console.log(positionY);
        //2.positionY的值和themeTopY的值对比
        let length = this.themeTopYs.length
        for(let i=0;i<length;i++){
          if(this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i]))){
            this.currentIndex = i ;
            console.log(i)
            this.$refs.nav.currentIndex = this.currentIndex
          }
        } 
        //3.判断back-top是否显示
        this.listenShowBackTop(position)
      },
      addToCart() {
        //1.获取购物车需要展示的商品基本信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)

      }
 
    },
    created() {
      //1.save iid
      this.iid = this.$route.params.iid
      //2.network request
      getDetail(this.iid).then(res =>{
        console.log(res);
        const data = res.data.result

        //1.获取顶部轮播图的图片数据
        this.topImages = data.itemInfo.topImages

        //2.获取商品数据
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //4.获取商品详细的信息
        this.detailInfo = data.detailInfo


        //5.获取商品参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //6. 获取商品评论的信息
        if(data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //3.获取商品推荐数据
      getRecommend().then(res =>{
        // console.log(res)
        this.recommends = res.data.data.list
      })
      //4.给getthemeTopYs赋值
      // this.getThemeTopYs = debounce(()=>{
      //     this.themeTopYs = []
      //     this.themeTopYs.push(0)
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          
      //     console.log(this.themeTopYs);
          
    //     },100)
    },
    updated() {
       this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          //加一个最大值，方便我们滚动的y值和区间比较
          this.themeTopYs.push(Number.MAX_VALUE)

          
          console.log(this.themeTopYs);
      // this.getThemeTopYs()
    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh(),50)
      // //1.对监听的事件进行保存
      // this.itemImgLisener = ()=>{
      //   refresh()
      // }
      // //2.图片加载完成的事件监听
      // this.$bus.$on('itemImageLoad',this.itemImgLisener)
      
    },
   
    destroyed() {
      //销毁时取消对全局的监听（这里没用keepalive,所以deactivated无效，因此在destoryed中写入）
      this.$bus.$off('itemImageLoad',this.itemImgLisener)
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  touch-action: none;
  /* position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0; */
}
</style>