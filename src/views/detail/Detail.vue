<template>
  <div id="detail">
    <detail-nav/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNav from './childComps/DetailNav';
  import DetailSwiper from './childComps/DetailSwiper';

  import {getDetail} from 'network/detail.js';

  export default {
    name:'Detail',
    data() {
      return {
        iid:null,
        topImages:[]
      }
    },
    components: {
      DetailNav,
      DetailSwiper
    },
    created() {
      //1.save iid
      this.iid = this.$route.params.iid
      //2.network request
      getDetail(this.iid).then(res =>{
        console.log(res);
        this.topImages = res.data.result.itemInfo.topImages
      })
    },
  }
</script>

<style scoped>

</style>