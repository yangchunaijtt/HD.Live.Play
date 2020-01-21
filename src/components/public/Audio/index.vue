<template>
  <div class="audio">
    <audio
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      src="http://up_mp4.t57.cn/2018/1/03m/13/396131228287.m4a" controls="controls"></audio>
    <!-- 音频播放控件 -->
    <div>
      <div class="progress df jcsb aic">
        <van-icon name="underway-o" size=".6rem" class="backward"></van-icon>
        <van-slider v-model="sliderTime" @input="changeCurrentTime" class="slider f1">
          <div
            slot="button"
            class="custom-button"
          >
            <van-tag round>{{ audio.currentTime | formatSecond }} / {{audio.maxTime | formatSecond}}</van-tag>
          </div>
        </van-slider>
        <van-icon name="underway-o" size=".6rem" class="forward"></van-icon>
      </div>
      <van-icon v-bind:name="audio.playing | transPlayPause" ></van-icon>
    </div>
  </div>
</template>

<script>
import { Button, Tag, Slider, Icon } from 'vant'

// 将整数转换成 时：分：秒的格式
function realFormatSecond (second) {
  const secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    const hours = Math.floor(second / 3600)
    second = second - hours * 3600
    const mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}

export default {
  data () {
    return {
      audio: {
        // 音频是否处于播放状态
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      },
      sliderTime: 0
    }
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      console.log('timeupdate')
      console.log(res)
      this.audio.currentTime = res.target.currentTime
      this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata (res) {
      console.log('loadedmetadata')
      console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime (index) {
      this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause (value) {
      return value ? 'pause-circle-o' : 'play-circle-o'
    },
    // 将整数转化成时分秒
    formatSecond (second = 0) {
      return realFormatSecond(second)
    }
  },
  components: {
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Slider.name]: Slider,
    [Icon.name]: Icon
  }
}
</script>

<style lang="scss" scoped>
  .audio {
    .van-tag--round{
      display: inline-block;
    }
    .backward{
      margin-right: 10px;
    }
    .forward{
      margin-left: 10px;
    }
  }
</style>
