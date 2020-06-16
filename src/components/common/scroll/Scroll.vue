<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'; 
  export default {
    name:"Scroll",
    data() {
      return {
        bscroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad: {
        type:Boolean,
        default:false
      }
    },

    mounted() {
      //1.创建BScroll对象
      this.bscroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      this.bscroll.on('scroll',(position)=>{
        // console.log(position)
        this.$emit('scroll',position)
      })
      //3.监听上拉加载
      this.bscroll.on('pullingUp',()=>{
        this.$emit('pullingUp');
        this.bscroll.finishPullUp()
      })
    },
    methods: {
      bscrollTo(x,y,time=300){
        this.bscroll.scrollTo(x,y,time)
      }
    },
  }
</script>

<style scoped>

</style>>
