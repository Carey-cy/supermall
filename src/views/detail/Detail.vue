<template>
  <div id="detail">
    <detail-nav class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods = "goods" />
      <detail-shop-info :shop="shop" />
      <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/> -->
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods = "recommends"/>
    </scroll>
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

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail.js';
  import {debounce} from 'common/untils.js';
  import {itemLitenerMixin} from 'common/mixin.js';

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';

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
        itemImgLisener: null
      }
    },
    mixins:[itemLitenerMixin],
    created() {
      //1.save iid
      this.iid = this.$route.params.iid
      //2.network request
      getDetail(this.iid).then(res =>{
        // console.log(res);
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
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    components: {
      DetailNav,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
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
     /* position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0; */
  }
</style>