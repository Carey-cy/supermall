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
      }
    },

    mounted() {
      this.bscroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType
      })
      this.bscroll.on('scroll',(position)=>{
        console.log(position)
        this.$emit('scroll',position)
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
