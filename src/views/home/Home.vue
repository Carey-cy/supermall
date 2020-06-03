<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from 'network/home.js'

  export default {
    name: 'Home',
    components: {
      NavBar,
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