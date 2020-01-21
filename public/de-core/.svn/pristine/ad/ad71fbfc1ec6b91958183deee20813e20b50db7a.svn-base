// 封装时间的相关操作
DE.define('DE.Tools.Datetime', {
  singleton: true,

  // 格式化音频时间到字符串
  formatAudioTime: function (val) {
    if (val == undefined) {
      return '0:00'
    }

    var iMinute = parseInt(val / 60)
    var iSecond = parseInt(val % 60)
    return iMinute + ':' + ((iSecond < 10) ? '0' + iSecond : iSecond)
  },

  // 强制转换时间，可能需要优化
  // detodo
  forceDate: function (val) {
    return new Date().Force(val)
  },

  // 获取时间差
  getDateDiff: function (ABegin, AEnd) {
    var diff = AEnd.getTime() - ABegin.getTime()

    var days = Math.floor(diff / (24 * 3600 * 1000))
    var leave = diff % (24 * 3600 * 1000)
    var hours = Math.floor(leave / (3600 * 1000))
    leave = leave % (3600 * 1000)
    var minutes = Math.floor(leave / (60 * 1000))
    leave = leave % (60 * 1000) // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave / 1000)

    var obj = {
      text: ((days > 0) ? days + ' d ' : '') + ((hours > 0) ? hours + ' h ' : '') + ((minutes > 0) ? minutes + ' m ' : '') + ((seconds > 0) ? seconds + ' s' : ''),
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }

    return obj
  },

  // 获取时间差结构，可能需要和上面的方法进行优化处理
  // detodo
  getTimeDiffStuct: function (diff) {
    var days = Math.floor(diff / (24 * 3600 * 1000))
    var leave = diff % (24 * 3600 * 1000)
    var hours = Math.floor(leave / (3600 * 1000))
    leave = leave % (3600 * 1000)
    var minutes = Math.floor(leave / (60 * 1000))
    leave = leave % (60 * 1000) // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave / 1000)

    var obj = {
      text: ((days > 0) ? days + ' d ' : '') + ((hours > 0) ? hours + ' h ' : '') + ((minutes > 0) ? minutes + ' m ' : '') + ((seconds > 0) ? seconds + ' s' : ''),
      textcn: ((days > 0) ? days + '天' : '') + ((hours > 0) ? hours + '小时' : '') + ((minutes > 0) ? minutes + '分' : '') + ((seconds > 0) ? seconds + '秒' : ''),
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }

    return obj
  },

  formatDateTime: function (val, format) {
    var dt = this.forceDate(val)
    return dt.Format(format)
  }

})

var DETDT = DE.Tools.Datetime
