DE.define('DE.Func', {
  singleton: true,

  If: function (val, def) {
    return (val) || def
  },

  Id: function (id, AOle) {
    AOle = (AOle) ? $(AOle) : $('body')
    return AOle.find("[de-id='" + id + "']")
  },

  DEData: function (AData, AOle) {
    AOle = (AOle) ? $(AOle) : $('body')
    return AOle.find("[de-data='" + AData + "']")
  },

  // 创建新的GUID
  newGUID: function () {
    return Guid.NewGuid().ToString('N').toUpperCase()
  }

})

var DEFunc = DE.Func
var DEF = DEFunc
