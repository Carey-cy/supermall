<template>
  <div id="detail">
    <detail-nav class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods = "goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNav from './childComps/DetailNav';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';

  import {getDetail,Goods,Shop} from 'network/detail.js';

  import Scroll from 'components/common/scroll/Scroll';

  export default {
    name:'Detail',
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop: {},
        detailInfo: {}
      }
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
      Scroll,
      DetailGoodsInfo
    },
    created() {
      const data = 
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
      })
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
  }
</style>