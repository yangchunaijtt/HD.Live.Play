<template>
  <van-image-preview
    v-model="data.show"
    :images="data.imgs"
    :lazy-load="true"
    :startPosition="data.index"
    @change="onChange"
  >
    <template v-slot:index>第{{ getIndex + 1 }}页</template>
  </van-image-preview>
</template>
<script>
// TODO 视频相关
export default {
  name: 'Preview',
  data () {
    return {
      index: 0
    }
  },
  props: ['data'],
  created () {
    this.getIndex && this.getIndex(this.data)
  },
  computed: {
    getIndex: function (data) {
      return data.index
    }
  },
  methods: {
    onChange (index) {
      this.index = index
    }
  }
}
</script>
