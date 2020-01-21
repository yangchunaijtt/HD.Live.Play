<template>
  <div class="container" v-if="smsCaller.Ctl">
    <div class="tc top">
      <img v-lazy='LogoImg' alt="logo" class="logo">
      <h2>你好</h2>
      <p>欢迎使用{{AppName}}</p>
    </div>
    <div class="field" >
      <van-field placeholder="手机号" v-model="smsCaller.Ctl.SMS.phone" :error-message="phoneNumberError"></van-field>
      <van-field placeholder="验证码" v-model="smsCaller.Ctl.SMS.code" type="text" maxlength="4">
		<VerifyCodeBtn slot="button" @sendVerifyCode="sendVerifyCode" :restTime="smsCaller.Ctl.UI.NextSend" class="codediv"/>
      </van-field>
    </div>
    <div class="checked"  @click="() => checkChange()">
      <van-cell-group  @click="(e) => checkChange(e)">
        <van-checkbox v-model="checked" checked-color="#ff6906" @click="(e) => checkChange(e)">保持登录状态</van-checkbox>
      </van-cell-group>
    </div>
    <div class="login-bottom tc">
      <van-button size="large" @click="handleLogin" type="info" class="loginBtn" :disabled="!smsCaller.Ctl.UI.CheckStatus">{{smsCaller.Ctl.UI.CheckTitle}}</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Button, Checkbox, CellGroup } from 'vant'
import { mapMutations, mapGetters } from 'vuex'
import VerifyCodeBtn from '@/components/public/VerifyCodeBtn'

export default {
  name: 'login',
  data () {
    return {
      phoneNumber: '',
      phoneNumberError: '',
      verifyCode: '',
      // 预定义sms操作对象
      smsCaller: {},
      sms: {},
      checked: true
    }
  },
  computed: {
    LogoImg () {
      try {
        return this.$store.state.appDefine.BaseInfo.AppTHLogo
      } catch (err) {
        return '../assets/logo.png'
      }
    },
    AppName () {
      try {
        return this.$store.state.appDefine.BaseInfo.AppName
      } catch (err) {
        return '教学中心'
      }
    }
  },
  created () {
    this.smsCaller = new DE.Sys.SysSMSTarget.Caller()
    var _this = this
    setTimeout(function () {
      _this.smsCaller.initEnv()
    }, 100)

    let sphone = this.$cookies.get('phone')

    if (sphone) {
      const redirect = this.$route.query.redirect || '/home'

      this['global/SetPhone'](sphone)

      DE.Instance.Phone = sphone

      this.$router.replace({
        path: redirect
      })
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CellGroup.name]: CellGroup,
    VerifyCodeBtn
  },
  methods: {
    ...mapMutations([
      'global/SetPhone'
    ]),
    sendVerifyCode () {
      // 发送验证码
      this.smsCaller.callSend()
    },
    handleLogin () {
      const self = this
      this.smsCaller.callCheck().then(() => {
        const redirect = self.$route.query.redirect || '/home'
        self['global/SetPhone'](self.smsCaller.Ctl.SMS.phone)

        DE.Instance.Phone = self.smsCaller.Ctl.SMS.phone

        if (self.checked) {
          self.$cookies.set('phone', self.smsCaller.Ctl.SMS.phone, '30d')
        } else {
          self.$cookies.set('phone', '')
        }
        self.$router.replace({
          path: redirect
        })
      })
    },
    checkChange (e) {
      if (e) {
        e.stopPropagation()
      }
      this.checked = !this.checked
    }
  }

}
</script>
<style lang="scss" scoped>

  .container{
    padding: 0 30px;
  }
  .top{
    padding-top:40px;
    .logo{
      display:block;
      // width:40px;
      height:60px;
      margin:30px auto;
      margin-top:0px;
    }
    h2{
      font-size: 20px;
      font-weight: normal;
      color: #333;
    }
    p{
      font-size: 14px;
      color: #999;
    }
  }
  .field{
    margin: 60px 0;
    .van-cell{
      margin-bottom: 11px;
      padding-left: 0;
      padding-right: 0;
    }
    .van-cell:last-child{
      margin-bottom: 0;
    }
    .van-cell::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      border-bottom: .5px solid #e4e4e4;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
	.codediv{
		cursor: pointer;
		width:100px;
		height:30px;
		background: #ff6906;
		color: #fff;

	}
  }
  .checked{
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
      border:none;
    }
  }
  .login-bottom{
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    font-size: 11px;
    color: #999;
    .loginBtn{
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      background-color: $color;
      border: 1px solid $color;
      margin-bottom: 15px;
    }
  }
</style>
