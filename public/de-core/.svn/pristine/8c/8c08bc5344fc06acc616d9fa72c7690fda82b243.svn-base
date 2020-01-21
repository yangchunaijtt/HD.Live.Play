// ------------------------------------------------------------------
//                          所有基类对象
// ------------------------------------------------------------------

var DeObjID = 100
var MaxInt = 2147483647

DE.define('DE.Root', {
  extend: 'DE.util.Observable',

  // 构造函数
  constructor: function () {
    this.callParent(arguments)
    this.bizExtend = new Array()
    DeObjID++
    this.DeObjID = 'DEObject-' + DeObjID
  },

  // 扩展数据对象键对包
  bizExtend: [],

  // 我也不知道有什么用 :(
  addExtend: function (key, extend) {
    this.bizExtend[key] = extend
  },

  // 我也不知道有什么用 :(
  getExtend: function (key) {
    return this.bizExtend[key]
  }

})

DE.define('DE.VUE', {
  singleton: true
})
