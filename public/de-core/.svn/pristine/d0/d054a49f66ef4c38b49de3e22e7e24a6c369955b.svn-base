// 提供前台验证的方法实现
DE.define('DE.Validate', {
  singleton: true,

  reg_mobile: /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}|(19[0-9]{1})))+\d{8})$/,

  isMobile: function (AVal) {
    return this.reg_mobile.test(AVal)
  },

  reg_mail: /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  isMail: function (AVal) {
    return this.reg_mail.test(AVal)
  },

  // 判断是否整形
  isInteger: function (val) {
    var re = /^[1-9]+[0-9]*]*$/
    return re.test(val)
  }

})
