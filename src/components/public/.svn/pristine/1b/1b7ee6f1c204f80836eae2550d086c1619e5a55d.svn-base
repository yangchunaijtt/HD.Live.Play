<template>
  <div class="grid">
    <van-grid v-bind="{...defaultGridProps, ...gridProps}">
      <van-grid-item
        v-for="(item, index) in data"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        :url="item.url"
        class="color"
      ></van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { Grid, GridItem } from 'vant'

export default {
  data () {
    return {
      defaultGridProps: {
        columnNum: 4, // 列数
        gutter: 0, // 格子之间的间距，默认单位为px
        border: false, // 是否显示边框
        center: true, // 是否将格子内容居中显示
        square: false, // 是否将格子固定为正方形
        clickable: false, // 是否开启格子点击反馈
        iconSize: '28px' // 图标大小，默认单位为px
      }
    }
  },
  props: {
    gridProps: {
      type: Object
    },
    data: {
      type: Array,
      default: function () {
        const iconLink = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577083530&di=452cd5b0f5725bab421b39fea5632a8b&imgtype=jpg&er=1&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F40%2F32%2F98573cf75c3bf04.jpg'
        return [
          { icon: 'gem-o', text: '小学', url: 'http://www.baidu.com' },
          { icon: iconLink, text: '高中', url: '#/login' },
          { icon: 'gem-o', text: '大学', url: 'http://www.baidu.com' },
          { icon: 'gem-o', text: '从业', url: 'http://www.baidu.com' }
        ]
      }
    }
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
}
</script>
<style>
  
</style>
