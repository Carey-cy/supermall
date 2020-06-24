<template>
  <div id="detail">
    <detail-nav/>
  </div>
</template>

<script>
  import DetailNav from './childComps/DetailNav';

  import {getDetail} from 'network/detail.js';

  export default {
    name:'Detail',
    data() {
      return {
        iid:null
      }
    },
    components: {
      DetailNav
    },
    created() {
      //1.save iid
      this.iid = this.$route.params.iid
      //2.network request
      getDetail(this.iid).then(res =>{
        console.log(res)
      })
    },
  }
</script>

<style scoped>

</style>