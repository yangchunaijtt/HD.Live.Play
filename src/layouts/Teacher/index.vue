<template>
  <div class="BasicLayout">
    <Top  @clickMask="clickMask" :showMask="showMask"  @hiddenMask='hiddenMask'/>
    <transition name="masktran">
      <div class="mask" v-show="showMask" @click="hiddenMask" :style="{'height':MaskHeight + 'px'}"></div>
    </transition>
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view class="router" v-else></router-view>
    </transition>
    
  </div>
</template>

<script>
import Top from './Top'
import defaultSetting from '@/settings'

export default {
  name: 'TeacherLayout',
  components: {
    Top,
  },
  computed: {
    transitionName () {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    },
    transitionName () {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  },
  methods:{
    clickMask(){
      this.showMask = !this.showMask;
    },
    hiddenMask(){
      this.showMask = false;
    },
  },
  data() {
    return {
      showMask: false,
      routername: '',
      MaskHeight: document.body.offsetHeight - 50,
    }
  },
 
}
</script>

<style lang="scss" scoped>
.BasicLayout {
	position: relative;
    .mask {
      position: absolute;
      top: 50px;
      left: 0px;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 500;
      opacity: 1;
      backdrop-filter: blur(10px);

      &.masktran-enter-active, &.masktran-leave-active {
        transition: opacity .5s ease
      }

      &.masktran-enter, &.masktran-leave-active {
        opacity: 0
      }
    }
  }
  
</style>
