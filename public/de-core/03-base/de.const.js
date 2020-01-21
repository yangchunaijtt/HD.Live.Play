// 字典项通用处理基类

DE.define('DE.Const', {
  singleton: true,

  arrConsts: new Array(),

  initConst: function (Arr) {
    for (var i = 0; i < Arr.length; i++) {
      if (typeof (Arr[i]) === 'string') {
        this.getConst({ code: Arr[i] })
      } else {
        this.arrConsts[Arr[i].Code] = Arr[i]
      }
    }
  },

  delConst: function (code) {
    console.log(this.arrConsts)
    if (this.arrConsts[code]) {
      this.arrConsts[code] = null
    }
  },

  getConst: function (_config) {
    var config = {
      code: '',
      NeedFresh: false,
      paramCode: [],
      paramValue: []
    }
    DE.merge(config, _config)

    var obj = {}

    if (this.arrConsts[config.code] && !config.NeedFresh) {
      obj = this.arrConsts[config.code]
      if (config.callback) {
        config.callback(obj)
      }
    } else {
      var params = {
        opcls: ABC.ConstCls,
        opcode: 'getConstPackage',
        bizPkg: 'BizSys',
        selID: config.code,
        NeedFresh: config.NeedFresh,
        paramCode: config.paramCode.join(','),
        paramValue: config.paramValue.join(',')
      }

      $.ajax({
        type: 'post',
        url: ABC.getUrl('/pubapi/pubJsonDeal.ashx'),
        data: params,
        async: false,
        success: function (data) {
          var data = JSON.parse(data)
          DE.Const.arrConsts[config.code] = data
          if (config.callback) {
            config.callback(data)
          }
        }
      })
    }
  },

  transConst: function (ACode, AValue) {
    var _const = this.arrConsts[ACode]
    if (_const && _const.List) {
      for (var i = 0; i < _const.List.length; i++) {
        if (_const.List[i].value == AValue) { return _const.List[i].caption }
      }
    }
    return AValue
  },
  getValue: function (ACode, AText) {
    var _const = this.arrConsts[ACode]
    if (_const && _const.List) {
      for (var i = 0; i < _const.List.length; i++) {
        if (_const.List[i].caption == AText) { return _const.List[i].value }
      }
    }
    return ''
  },

  getTexts: function (ACode) {
    var str = ''
    var _const = this.arrConsts[ACode]
    if (_const && _const.List) {
      for (var i = 0; i < _const.List.length; i++) {
        str += ' ' + _const.List[i].caption + '\n'
      }
    }
    return str
  },

  freshConst: function (scode) {
    var config = {
      code: scode,
      NeedFresh: true
    }
    this.getConst(config)
  }

})
