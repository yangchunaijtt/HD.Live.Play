<template>
  <van-button class="verify-btn"
              @click="btnClick"
              size="mini"
              :disabled="!!restTime">
    {{restTime ? `${restTime}S` : '获取验证码'}}
  </van-button>
</template>
<script>
import { Button } from 'vant'

export default {
  name: 'VerifyCodeBtn',
  components: {
    [Button.name]: Button
  },
  props: ['restTime'],
  data () {
    return {
    }
  },
  methods: {
    btnClick () {
      // this.codeRestTime = this.restTime
      // let timer = setInterval(() => {
      //   --this.codeRestTime
      //   if (!this.codeRestTime) {
      //     clearInterval(timer)
      //     timer = null
      //   }
      // }, 1000)
      this.$emit('sendVerifyCode')
    }
  }
}
</script>
<style lang="scss" scoped>
  .verify-btn {
    width: 70px;
    height: 24px;
    border-radius: 4px;
    font-size: 11px;
    color: #ccc;
  }
</style>
