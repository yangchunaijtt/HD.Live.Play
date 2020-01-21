<template>
  <div class="swipe">
    <van-swipe v-bind="{...defaultSwipeProps, ...swipeProps}">
      <van-swipe-item v-for="(item, index) in images" :key="index" @click="() => handleClick(item)">
        <img v-lazy="item.image"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant'

export default {
  data () {
    return {
      defaultSwipeProps: {
        autoplay: 3000, // 自动轮播间隔，单位为 ms
        duration: 500, // 动画时长，单位为 ms
        initialSwipe: 0, // 初始位置索引值
        // width: , // 滑块宽度
        // height: ,  // 滑块高度
        loop: true, // 是否开启循环播放
        showIndicators: true, // 是否显示指示器
        indicatorColor: '#1989fa', // 指示器颜色
        vertical: false, // 是否为纵向滚动
        touchable: true, // 是否可以通过手势滑动
        stopPropagation: false // 是否阻止滑动事件冒泡
      }
    }
  },
  props: {
    images: {
      type: Array,
      default: function () {
        return [
          { image: 'https://img.yzcdn.cn/vant/apple-1.jpg', link: 'http://www.baidu.com' },
          { image: 'https://img.yzcdn.cn/vant/apple-2.jpg', link: 'http://www.baidu.com' }
        ]
      }
    },
    swipeProps: {
      type: Object
    }
  },
  methods: {
    handleClick: function (item) {
      console.log('swipeClick', item)
      this.$emit('handleClick', item)
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
}
</script>
<style lang="scss" scoped>
  .swipe {
    .van-swipe-item img {
      width: 100%;
    }
  }
</style>
