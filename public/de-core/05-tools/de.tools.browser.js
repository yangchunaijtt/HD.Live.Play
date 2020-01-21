// 操作浏览器的各种方法
DE.define('DE.Tools.Browser', {
  singleton: true,

  // 获取URL参数
  getUrlParam: function () {
    var url = location.hash // 获取url中"?"符后的字串

    var params = new Object()

    if (url.indexOf('?') != -1) {
      url = url.substr(url.indexOf('?'))

      var str = url.substr(1)
      strs = str.split('&')

      for (var i = 0; i < strs.length; i++) {
        params[strs[i].split('=')[0]] = (strs[i].split('=')[1])
      }
    }
    return params
  },

  // 通过名字获取URL参数值
  getUrlParamByName: function (AName, ADef) {
    var params = this.getUrlParam()
    return params[AName] ? params[AName] : ADef
  },

  // 通过名字设置URL参数值
  setUrlParamByName: function (AName, AVal) {
    var params = this.getUrlParam()
    var arr = new Array()
    params[AName] = AVal

    for (var key in params) {
      arr.push(key + '=' + params[key])
    }

    return location.origin + location.pathname + '?' + arr.join('&')
  },

  // 通过数组设置URL参数
  setUrlParams: function (Arr) {
    var params = this.getUrlParam()
    var arr = new Array()

    for (var i = 0; i < Arr.length; i++) {
      params[Arr[i].name] = Arr[i].value
    }
    for (var key in params) {
      arr.push(key + '=' + params[key])
    }

    var sparam = arr.join('&')

    return location.origin + location.pathname + (sparam ? '?' + arr.join('&') : '')
  },

  // 添加导航历史记录
  addHistory: function (AUrl, AStatus, ATitle) {
    history.pushState(AStatus, ATitle, AUrl)
  },

  // 设置本地Cookie
  setCookie: function (name, value, time) {
    var times = time || 60
    var exp = new Date()
    exp.setTime(exp.getTime() + times * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  },

  // 读取本地cookies
  getCookie: function (name) {
    var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')

    if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return null }
  },

  // 删除本地cookies
  delCookie: function (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.GetCookie(name)
    if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
  },

  // URL添加时间戳
  addTimeStamp: function (url) {
    if (url.indexOf('?') > 0) {
      url += '&t=' + Date.parse(new Date())
    } else {
      url += '?t=' + Date.parse(new Date())
    }
    return url
  },

  isWeiXin: function () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
      return true
    } else {
      return false
    }
  }

})

var DETBrowser = DE.Tools.Browser
