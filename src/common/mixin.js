import {debounce} from 'common/untils.js';

export const itemLitenerMixin = {
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh(),50)
    //1.对监听的事件进行保存
    this.itemImgLisener = ()=>{
      refresh()
    }
    //2.图片加载完成的事件监听
    this.$bus.$on('itemImageLoad',this.itemImgLisener)
    console.log('混入内容')
  },
}