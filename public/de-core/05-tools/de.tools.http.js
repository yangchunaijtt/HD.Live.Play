
// 封装网络请求相关方法

DE.define('DE.Tools.Http', {
  singleton: true,

  // 强制转换JSON字符串到对象
  forceJSONParse: function (AJson) {
    var iCount = 0

    if (AJson) {
      try {
        while (typeof AJson === 'string' && iCount < 10) {
          AJson = JSON.parse(AJson)
          iCount++
        }
      } catch (e) {
      }
    }

    return AJson
  },

  forceObjJSONParse: function (AObj) {
    var iCount = 0
    if (AObj) {
      if (typeof AObj === 'object');

      for (var item in AObj) {
        switch (typeof item) {
          case 'string':
            item = this.forceJSONParse(item)
          default:
        }
      }
    }
    return AObj
  },

  // 封装的Ajax Post方法
  post: function (AUrl, AData, ACallOk, ACallErr, AShowLoading) {
    var fdata = new FormData()

    for (var Key in AData) {
      fdata.append(Key, AData[Key])
    }

    fdata.showLoading = AShowLoading

    DE.VUE.requst({
      url: AUrl,
      method: 'post',
      data: fdata
    }).then(function (value) {
      ACallOk(value)
    }).catch(function (err) {
      ACallErr(err)
    })
  }

})

var DETHttp = DE.Tools.Http
