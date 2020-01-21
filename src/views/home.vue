<template>
  <div class="home" ref='home'>
    <div class="center" v-if='showStudent && showTeacher' v-show='loading'>
       <div class="hd" ref='hd'>
          <img v-lazy='LogoImg'  alt="logo" class="logo"/>
          <h3>你好</h3>
          <p>请选择你要使用的平台</p>
        </div>
        <div class="content" :style='{"height":contentHeight}'>
          <div class="ctcenter">
            <router-link to="/student/home" class="item"  v-show='showStudent'>
              <div class="warpper clearfix">
                <IconSvg class='sicon stimg ' icon='de-app-icon-hat'></IconSvg>
                <h4 class="text">学习中心</h4>
                <IconSvg class='icon' icon='de-arrow-a-right'></IconSvg>
              </div>
              <div class="btimg">
                <IconSvg class='rifghticon srighticon' icon='de-app-icon-hat'></IconSvg>
              </div>
            </router-link>
            <router-link to="/teacher/home" class="item"  v-show='showTeacher'>
              <div class="warpper clearfix">
                <IconSvg class='ticon stimg' icon='de-app-icon-add' ></IconSvg>
                <h4 class="text">教学中心</h4>
                <IconSvg class='icon' icon='de-arrow-a-right'></IconSvg>
              </div>
              <div class="btimg">
                <IconSvg class='rifghticon trighticon' icon='de-app-icon-add'></IconSvg>
              </div>
            </router-link>
          </div>
      </div>
    </div>
    <div class="hnopower" v-else v-show='!loading'>
      <NoPower></NoPower>
    </div>
  </div>
</template>
<script>

import { Button } from 'vant'
import { mapActions, mapGetters } from 'vuex'
import NoPower from '@/components/biz/NoPower'

export default {

  name: 'home',
  data () {
    return {
      loading: true,
      showStudent: false,
      showTeacher: false,
      HdHeight: 0,
      contentHeight: '',
      screenHeight: document.body.clientHeight,
      timer: true
    }
  },
  components: {
    [Button.name]: Button,
    NoPower
  },
  computed: {

    LogoImg () {
      try {
        return this.$store.state.appDefine.BaseInfo.AppTHLogo
      } catch (err) {
        return ''
      }
    },
    homeName () {
      return `${this.userName} 你好`
    }
  },
  created () {
    // 获取数据
    Promise.all([ this['global/getStudent'](), this['global/getTeacher']()]).then((value) => {
      let isStudent = value[0] !== null && value[0].length > 0
      let isTeacher = value[1] !== null && value[1].length > 0

      this.showStudent = isStudent
      this.showTeacher = isTeacher

      if (!this.showTeacher && !this.showStudent) {
        this.loading = false
      } else if (!this.showTeacher) {
        this.$router.push({ path: '/student/home' })
      } else if (!this.showStudent) {
        this.$router.push({ path: '/teacher/home' })
      }
    })
  },
  mounted () {
    // 监听页面高度变化
    let that = this
    that.HdHeight = 220

    window.screenHeight = document.body.clientHeight
    that.screenHeight = window.screenHeight
    that.contentHeight = that.screenHeight - that.HdHeight + 'px'
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
        that.contentHeight = that.screenHeight - that.HdHeight + 'px'
      })()
    }
  },
  methods: {
    ...mapActions([
      'global/getStudent',
      'global/getTeacher'
    ])
  }
}
</script>
<style lang="scss" scoped>
  .home{
    width:100%;
    height:100%;
    overflow-y: hidden;
    .center{
      width:100%;
      padding-top:56px;
      z-index:10;
      .hd{
        width:100%;
        box-sizing: border-box;
        min-height:164px;
        .logo{

          display:block;
          height:60px;
          margin:0 auto;
        }
        h3{
          margin-top:30px;
          line-height: 28px;
          text-align: center;
          font-size: 20px;
          color: #333333;
        }
        p{
          font-size: 14px;
          color: #999999;
          text-align: center;
        }
      }
      .content{
        position: relative;
        width:100%;
        box-sizing: border-box;
        min-height:230px;
        .ctcenter{
          position: absolute;
          top:50%;
          left:0px;
          width:100%;
          margin-top:-100px;
          box-sizing: border-box;
          padding:0px 30px;
          .item{
            display: block;
            position: relative;
            height:100px;
            margin-top:20px;
            background: #FFFFFF;
            border: 0 solid #E4E4E4;
            box-shadow: 0 10px 20px 0 rgba(0,0,0,0.07);
            border-radius: 8px;
            border-radius: 8px;
            overflow: hidden;
            &:first-child{
              margin-top:0px;
            }
            .warpper{
              position: absolute;
              top:50%;
              left:0px;
              min-height:30px;
              margin-top:-15px;
              margin-left:30px;
              max-height:36px;
              vertical-align: middle;
              .stimg{
                display: inline-block;
                float:left;
                width:30px;
                font-size:30px;
                text-align: center;
                margin-right:15px;
                vertical-align: middle;
                &.sicon {
                  color: #FF6601;
                }
                &.ticon{
                  color: #57BF77;
                }

              }
              .text{
                display: inline-block;
                float:left;
                margin-right:5px;
                line-height: 30px;
                font-size: 17px;
                color: #333333;
                vertical-align: middle;
              }
              .icon{
                display: inline-block;
                float: left;
                height:30px;
                font-size:18px;
                font-weight: 600;
                color: #CCCCCC;
                vertical-align: middle;
              }

            }
            .btimg{
              position: absolute;
              right:0px;
              bottom:0px;
              width:80px;
              height:55px;
              display: inline-block;
              overflow: hidden;
              .rifghticon{
                font-size:100px;
                &.srighticon{
                  color: rgba(255,102,1,0.2); // #FF6601;
                }
                &.trighticon{
                  color:rgba(87,191,119,0.2); // #FF6601;
                }
              }
            }
          }
        }

      }
    }
    .hnopower{
      position: fixed;
      top:0px;
      left:0px;
      bottom:0px;
      right:0px;
      width:100%;
      height:100%;
      z-index:50;
      background:#fff;
    }
  }
</style>
