<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item,index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:"Swiper",
    props: {
      interval: {
        type: Number,
        default: 3000
      },
      animDuration: {
        type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }

    },
    data() {
      return {
        slideCount: 0,//元素个数
        totalWidth: 0,//swiper的宽度
        swiperStyle:{},//swiper样式
        currentIndex: 1,//当前的index
        scrolling: false,//是否滚动
      }
    },
    mounted() {
      //当组件挂载到home上100ms后开始执行轮播图
      setTimeout(()=>{
        //1.操作DOM，在前后分别加一个slide
        this.handleDom();
        //2.开启定时器
        this.startTimer()
      },1000)
    },
    methods: {
      /**
       * 设置定时器
       */
      startTimer() {
        this.playTimer = window.setInterval(() => {
          this.currentIndex++;
          this.scrollContent(- this.currentIndex * this.totalWidth)
        }, this.interval);
      },
      stopTimer() {
        window.clearInterval(this.playTimer)
      },
      /** 
       * 滚动到正确的位置
      */
      scrollContent(currentPosition) {
        //0.设置正在滚动
        this.scrolling = true;
        //1.开始滚动动画
        this.swiperStyle.transition = `transform` + this.animDuration + `ms`;
        this.setTransform(currentPosition)
        //2.判断滚动的位置
        this.checkPosition();
        //3.滚动完成
        this.scrolling = false;
      },
      /** 
       * 判断滚动的位置（首尾衔接）
      */
      checkPosition() {
        window.setTimeout(()=>{
          //1.检查正确的位置
          this.swiperStyle.transition = `0ms`;
          if(this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(- this.currentIndex * this.totalWidth);
          }else if(this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(- this.currentIndex * this.totalWidth)
          }
          //2.结束移动后的回调函数
          this.$emit('transitionEnd',this.currentIndex -1);
        },this.animDuration)
      },
      /**
       * 设置滚动的位置 
       */
      setTransform(position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },
      /** 
       * 操作DOM，在DOM前后添加Slide
      */
     handleDom() {
       //1.获取要操作的元素
       let swiperEl = document.querySelector('.swiper');
       let slideEls = swiperEl.getElementsByClassName('slide');

       //2.存储元素个数
       this.slideCount = slideEls.length;

       //3.如果slideCount大于1，就在前后各加一个slide
       if(this.slideCount > 1) {
         let cloneFirst = slideEls[0].cloneNode(true);
         let cloneLast = slideEls[this.slideCount - 1].cloneNode(true);
         swiperEl.insertBefore(cloneLast,slideEls[0]);
         swiperEl.appendChild(cloneFirst);
         this.totalWidth = swiperEl.offsetWidth;
         this.swiperStyle = swiperEl.style;
       }

       //4.让swiper元素显示第一个，也就是添加进去的cloneLast
       this.setTransform(- this.totalWidth)
     },
     
     /** 
      * 拖动事件的处理
     */
      touchStart(e) {
        //如果正在滚动，就不可以拖动
        if(this.scrolling) return; 

        //停止定时器
        this.stopTimer();

        //保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },
      touchMove(e) {
        //计算出用户拖动的距离
        
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth; 
        let moveDistance = currentPosition + this.distance;

        //设置当前位置
        this.setTransform(moveDistance)
      },
      touchEnd(e) {
        //获取拖动的距离
        let currentMove = Math.abs(this.distance);

        //判断最终的距离
        if(this.distance === 0){
          return 
        }else if(this.diatance > 0 && currentMove > this.totalWidth * this.moveRatio ){ //右移超过0.5
          this.currentIndex--
        }else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){ //左移超过0.5
          this.currentIndex++
        }

        //移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth)

        //移动完成，打开定时器
        this.startTimer()
      },
       /**
       * 控制上一个, 下一个
       */
      previous() {
        this.changeItem(-1)
      },
      next() {
        this.changeItem(1)
      },
      changeItem(num) {
        //1.移除定时器
        this.stopTimer()

        //2.修改位置和index
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth)

        //3.开启定时器
        this.startTimer()
      }
    },
  }
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 8px;
    width: 100%;
  }
  .indi-item {
    background-color: #fff;
    width: 8px;
    height: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>