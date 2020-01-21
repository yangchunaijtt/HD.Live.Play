<template>
  <div class="list">
    <van-list
      v-model="isLoading"
      :error.sync="error"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <slot></slot>
    </van-list>
  </div>
</template>
<script>
import { List } from 'vant'

export default {
  data () {
    return {
      isLoading: this.loading
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: true
    },
    error: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default: function () {
        return function () {
          console.log(1)
        }
      }
    }
  },
  components: {
    [List.name]: List
  }
}
</script>
<style lang="scss" scoped>
  .list {
  }
</style>
