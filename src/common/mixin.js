import {
  debounce
} from 'common/untils.js';

export const itemLitenerMixin = {
  data() {
    return {
      itemImgLisener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh(), 100)
    //1.对监听的事件进行保存
    this.itemImgLisener = () => {
      this.newRefresh()
    }
    //2.图片加载完成的事件监听
    this.$bus.$on('itemImageLoad', this.itemImgLisener)
    // console.log('混入内容')
  },
}
