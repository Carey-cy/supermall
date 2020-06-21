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
        default: false
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
      if(this.probeType ===2 || this.probeType ===3) {
        this.bscroll.on('scroll',(position)=>{
          // console.log(position)
          this.$emit('scroll',position)
        })
      }
      //3.监听上拉加载,滚动到底部
      if(this.pullUpLoad) {
        this.bscroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    }, 
    methods: {
      bscrollTo(x,y,time=300) {
        this.bscroll && this.bscroll.scrollTo(x,y,time)
      },
      refresh(){
        this.bscroll &&　this.bscroll.refresh();
        // console.log('--------')
      },
      finishPullUp() {
        this.bscroll && this.bscroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>