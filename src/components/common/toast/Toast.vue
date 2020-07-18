<template>
  <div class="toast" v-show="isShow" >
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name:'Toast',
    // props: {
    //   message:{
    //     type: String,
    //     default:''
    //   },
    //   isShow:{
    //     type: Boolean,
    //     default:false
    //   }
    // }
    data() {
      return {
        isShow:false,
        message:''
      }
    },
    methods: {
      show(message = '默认文字',duraction = 2000) {
        this.isShow = true
        this.message = message

        setTimeout(()=> {
          this.isShow = false
          this.message = ''
        },duraction)
      }
    },
  }
</script>

<style>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50%);
    background-color: rgba(0,0,0,.65);
    color: #fff;
    padding: 8px 10px;
    z-index: 999;
  }
</style>