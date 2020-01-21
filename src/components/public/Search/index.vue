<template>
  <div class="search">
    <van-search :placeholder="placeholder" shape="round" v-model="value"></van-search>
  </div>
</template>
<script>
import { Search } from 'vant'

export default {
  data () {
    return {
      value: ''
    }
  },
  components: {
    [Search.name]: Search
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
