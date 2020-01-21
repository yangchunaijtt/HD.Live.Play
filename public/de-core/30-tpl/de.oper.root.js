// 业务操作类Controller对象基类

DE.define('DE.Oper.Root', {
  extend: 'DE.util.Observable',

  config: {
    // 是否多选
    multSel: false
  },

  // 初始化对象结构
  initStruct: function () {
    this.ui = {
      cond: {},
      rows: [],
      columns: {},
      status: {},
      bizForm: null,
      fields: {},
      current: null,
      ready: true,
      action: ''
    }

    this.selection = {
      count: 0,
      items: [],
      ids: [],
      current: null,
      selAll: false
    }

    this.data = {
      cond: {},
      fields: {}
    }

    this.sort = new Array()

    this.connect = {
      subs: [],
      mains: []
    }

    this.defaultValue = {
      fields: {},
      conds: {}
    }

    this.status = {

    }

    this.custom = []

    this.callback = {
      query: new Array(),
      remove: new Array(),
      modify: new Array(),
      getdata: new Array()
    }
  },

  // 构造函数
  constructor: function () {
    this.initStruct()

    var _this = this

    this.EnvID = DE.Instance.newEnvID()

    $(document).on('keydown', function () {
      _this.ui.status.ctrlKey = window.event.ctrlKey
    })

    $(document).on('keyup', function () {
      _this.ui.status.ctrlKey = window.event.ctrlKey
    })
  },

  // 创建联结关系
  addConnect: function (AOper, AParams) {
    sub = {
      oper: AOper
    }
    main = {
      oper: this,
      params: AParams
    }

    this.connect.subs.push(sub)
    AOper.connect.mains.push(main)
  },

  // 主动调用Connect
  callConnect: function (AItem) {
    for (var i = 0; i < this.connect.subs.length; i++) {
      var sub = this.connect.subs[i]

      // 循环访问sub的main,设置Item
      for (var j = 0; j < sub.oper.connect.mains.length; j++) {
        var main = sub.oper.connect.mains[j]
        if (main.oper == this) {
          main.biz = AItem
        }
      }
      sub.oper.checkReady()

      // 设置值
      sub.oper.fillConnect()
      sub.oper.fillInitCond()

      if (sub.oper.ui.ready) {
        sub.oper.callQuery()
      }
    }
  },

  // 设置默认条件与取值
  setInit: function (Arr, isValue, isCond) {
    for (var i = 0; i < Arr.length; i++) {
      if (isValue) {
        DE.merge(this.defaultValue.fields, Arr[i])
      }
      if (isCond) {
        DE.merge(this.defaultValue.conds, Arr[i])
      }
    }
  },

  // 填充Connect数据
  fillConnect: function () {
    for (var i = 0; i < this.connect.mains.length; i++) {
      var main = this.connect.mains[i]

      for (var j = 0; j < main.params.length; j++) {
        var param = main.params[j]
        if (main.biz) {
          if (param.isCond) {
            this.data.cond[param.target] = main.biz[param.src]
          }
          if (param.isDefValue) {
            this.data.fields[param.target] = main.biz[param.src]
          }
        }
      }
    }
  },

  // 填充初始值
  fillInitCond: function () {
    if (this.defaultValue.fields && this.data.fields) {
      DE.merge(this.data.fields, this.defaultValue.fields)
    }

    if (this.defaultValue.conds && this.data.cond) {
      DE.merge(this.data.cond, this.defaultValue.conds)
    }
  },

  fillInitValue: function () {
    if (this.defaultValue.fields && this.data.fields) {
      DE.merge(this.data.fields, this.defaultValue.fields)
    }
  },

  getSortField: function (field) {
    return this.sort.getItem(field, 'property')
  },

  setSortField: function (define) {
    for (var i = 0; i < this.sort.length; i++) {
      if (this.sort[i].property == define.property) {
        this.sort[i].direction = define.direction == 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.sort[i].direction = 'NONE'
      }
    }
    this.sort.fresh()

    this.callQuery()
  },

  fillSort: function () {
    var arr = new Array()
    for (var i = 0; i < this.sort.length; i++) {
      if (this.sort[i].direction == 'ASC' || this.sort[i].direction == 'DESC') {
        arr.push(this.sort[i])
      }
    }
    return JSON.stringify(arr)
  },

  setSort: function (field, direct) {
    for (var i = 0; i < this.sort.length; i++) {
      if (this.sort[i].property == field) {
        this.sort[i].direction = direct
      } else {
        this.sort[i].direction = 'NONE'
      }
    }
    this.sort.fresh()
  },

  clearSort: function () {
    for (var i = 0; i < this.sort.length; i++) {
      this.sort[i].direction = 'NONE'
    }
    this.sort.fresh()
  },

  // 检查是否Ready
  checkReady: function () {
    var bReady = true
    for (var i = 0; i < this.connect.mains.length; i++) {
      bReady = bReady && (this.connect.mains[i].biz != null)
    }
    this.ui.ready = bReady
    return bReady
  },

  // 外部调用重置
  callReset: function (ACode, AConfig) {
    ACode = (ACode) || 'Reset'
    this._doCallAction(ACode, {}, AConfig)
  },

  // 外部调用查询
  callQuery: function (ACode, AConfig) {
    ACode = (ACode) || this.biz.queryCode

    var config = AConfig || {}

    this._doCallAction(ACode, {}, config)
  },

  // 外部调用更新
  callUpdate: function (AItem, ACode, AConfig) {
    ACode = ACode || 'Update'
    this._doCallAction(ACode, AItem, AConfig)
  },

  callShow: function (AItem, ACode, AConfig) {
    ACode = ACode || 'Show'
    this._doCallAction(ACode, AItem, AConfig)
  },

  callFreshShow: function (ACode, AConfig) {
    if (this.ui.current) {
      var AItem = this.ui.current
      AItem.sel = true
      ACode = ACode || 'Show'
      this._doCallAction(ACode, AItem, AConfig)
    }
  },

  callCloseForm: function (ACode) {
    if (ACode) {
      var def = this.biz.getAction(ACode)
      this.ui.action = ''
    } else {
      this.ui.action = ''
    }
  },

  callSaveForm: function (ACode, AConfig) {
    var def
    var _this = this
    if (ACode) {
      var def = this.biz.getAction(ACode)
    } else {
      def = this.ui.bizForm.def
    }

    if (def.processing) {
      return
    }

    def.processing = true

    var obj = {}

    // 填充预填
    // this.fillConnect();
    // this.fillInitValue();

    DE.merge(obj, this.data.fields)

    obj.Ext = null

    // 是否需要打包成JSON数据
    if (def.opJsonPackage) {
      obj.JsonPackage = JSON.stringify(obj)
    }

    // 打包通讯通道数据
    this.biz.fillCallParam(def, obj)

    this.doBeforeSave(def, obj)

    if (AConfig) {
      DE.merge(def, AConfig)
    }

    this._bizDoSave(obj,
      function (bizdata) {
        def.processing = false
        if (_this._opAfter(def)) {
          _this._doCallAction(_this._opAfter(def), {})
        }

        if (def.bizForm) {
          def.bizForm.close()
        }

        if (def.onSuccess) {
          def.onSuccess(bizdata, def)
        }

        // 统一外部注入回调
        _this._callback(def, bizdata)
      },
      function (_data) {
        def.processing = false

        if (def.onFailer) {
          def.onFailer(_data, def)
        }
      },
      def.opShowLoading
    )
  },

  callSelected: function (ACode) {
    var _this = this
    var ADef = this.biz.getAction(ACode)
    if (ADef && ADef.onSelected) {
      ADef.onSelected(this.selection.items, function (AOpCode) {
        switch (AOpCode) {
          case 'Fresh':
            setTimeout(_this.callQuery(ADef.opQueryCode), 1)
            break
          case 'Close':
            _this.callCloseForm(ACode)
            break
          default:
        }
      })
    }
  },

  // 外部调用删除
  callDelete: function (item, ACode, AConfig) {
    ACode = ACode || 'Delete'
    this._doCallAction(ACode, item, AConfig)
  },

  // 统一处理行选中切换操作
  callToggleSel: function (item) {
    if (!this.config.multSel || (!this.ui.status.ctrlKey)) {
      for (var i = 0; i < this.ui.rows.length; i++) {
        this.ui.rows[i].sel = false
      }
    }
    item.sel = !(item.sel)
    this.ui.rows.fresh()
    this._bizDoSelChange()

    if (item.sel) {
      this.selection.current = item
    } else {
      this.selection.current = null
    }
  },

  callAction: function (ACode, AItem, AConfig) {
    this._doCallAction(ACode, AItem, AConfig)
  },

  callGet: function (ACode, AItem, ACallBack) {
    var _this = this

    var def = this.biz.getAction(ACode)
    def.Oper = this

    // 首先提取
    var obj = {
      selID: AItem[this.biz.keyField]
    }
    this.biz.fillCallParam(def, obj)
    obj.opCode = def.opCodeGet

    this._bizDoGet(obj, function (bizdata) {
      _this._bizDealItem(ADef, bizdata.Object)
      ACallBack(bizdata)
    }, def)
  },

  regQueryCallBack: function (AFunc) {
    if (this.callback.query.indexOf(AFunc) < 0) {
      this.callback.query.push(AFunc)
    }
  },

  regGetDataCallBack: function (AFunc) {
    if (this.callback.getdata.indexOf(AFunc) < 0) {
      this.callback.getdata.push(AFunc)
    }
  },

  regModifyCallBack: function (AFunc) {
    if (this.callback.modify.indexOf(AFunc) < 0) {
      this.callback.modify.push(AFunc)
    }
  },

  _opAfter: function (define) {
    if (define.opAfter) {
      if (define.opAfter == this.biz.def.defaultQuery) {
        return this.biz.queryCode
      } else {
        return define.opAfter
      }
    } else {
      return ''
    }
  },

  _callback: function (ADef, bizdata) {
    switch (ADef.opModel) {
      case 'OP_QUERY':
        for (var i = 0; i < this.callback.query.length; i++) {
          this.callback.query[i](ADef, bizdata)
        }
        break
      case 'OP_SHOW':
        for (var i = 0; i < this.callback.getdata.length; i++) {
          this.callback.getdata[i](ADef, bizdata)
        }
        break
      case 'OP_BATCH':
      case 'OP_UPDATE':
      case 'OP_NEW':
      case 'OP_CUSTOM':
      case 'OP_CALL_SERVER':
        for (var i = 0; i < this.callback.modify.length; i++) {
          this.callback.modify[i](ADef, bizdata)
        }
        break
      default:
        console.log('未处理的回调操作编码：' + ADef.opModel)
    }
  },

  // 保存前处理
  doBeforeSave: function (ADef, AItem) {

  },

  // 统一触发动作
  _doCallAction: function (ACode, AItem, AConfig) {
    var def = this.biz.getAction(ACode)
    def.Oper = this
    this.ui.action = ACode
    def.processing = false

    // 如果存在扩展配置，那么应用进去
    if (AConfig) {
      DE.merge(def, AConfig)
    }

    switch (def.opModel) {
      case 'OP_RESET':
        this._bizDoReset(def)
        break
        break
      case 'OP_UPDATE':
        this._bizDoUpdate(def, AItem)
        break
      case 'OP_SHOW':
        this._bizDoShow(def, AItem)
        break
      case 'OP_BATCH':
        this._bizDoBatch(def, AItem)
        break
      case 'OP_CUSTOM':
        this._bizDoCustom(def, AItem)
        break
      case 'OP_CALL_SERVER':
        this._bizDoCallServer(def, AItem)
        break

      case 'OP_SELECT':
        this._bizDoSelect(def, AItem)
        break
    }
  },

  // 调用自定义处理
  _bizDoCustom: function (ADef, AItem) {
    if (this.custom[ADef.bizOpCode]) {
      this.custom[ADef.bizOpCode](ADef, AItem)
    }
  },

  // 保存状态
  _bizDoStatusSave: function () {

  },

  // 还原状态
  _bizDoStatusReset: function () {

  },

  _bizDoCallServer: function (ADef, AItem, AConfig) {
    var _this = this

    this.fillInitCond()
    var obj = {}

    DE.apply(obj, this.data.cond)
    AItem = AItem || {}
    DE.apply(obj, AItem)
    AItem = obj

    this.biz.fillCallParam(ADef, AItem)

    this._bizDoSave(AItem, function (bizdata) {
      if (_this._opAfter(ADef)) {
        _this._doCallAction(_this._opAfter(ADef), ADef.Item, AConfig)
      }

      if (ADef.onSuccess) {
        ADef.onSuccess(bizdata, ADef)
      }

      // 统一外部注入回调
      _this._callback(ADef, bizdata)
    }, function (_data) {
      if (ADef.onFailer) {
        ADef.onFailer(_data, ADef)
      }
    }, ADef.opShowLoading
    )
  },

  // 处理选择变化
  _bizDoSelChange: function () {
    var sels = new Array()
    var ids = new Array()
    for (var i = 0; i < this.ui.rows.length; i++) {
      if (this.ui.rows[i].sel) {
        sels.push(this.ui.rows[i])
        ids.push(this.ui.rows[i][this.biz.keyField])
      }
    }
    this.selection.items.copy(sels)
    this.selection.items.fresh()
    this.selection.ids.copy(ids)
    this.selection.ids.fresh()

    this.selection.count = sels.length
  },

  // 数据变化后，重新选择
  _bizDoReSel: function () {
    for (var i = 0; i < this.selection.ids.length; i++) {
      var idx = this.ui.rows.indexOfProp(this.selection.ids[i], this.biz.keyField, true)
      if (idx >= 0) {
        this.ui.rows[idx].sel = true
      }
    }
  },

  // 处理批量动作
  _bizDoBatch: function (ADef, AItem) {
    var _this = this

    if (ADef.opSilence) {
      doBiz()
    } else {
      var _title = '请确认'
      var _msg = '确实要' + ADef.opName + '指定的数据吗？'

      // 单条数据的询问提示
      if ((AItem) && (ADef.opMsgSingle)) {
        _msg = ADef.opMsgSingle.format(AItem)
      }

      // 多条数据的询问提示
      if ((!AItem) && (ADef.opMsgMult)) {
        _msg = ADef.opMsgMult.format(_this.selection.count)
      }

      // 确认询问操作
      DE.UI.Oper.showConfirm(_title, _msg, function () {
        doBiz()
      })
    }

    function doBiz () {
      // 获取操作对象列表
      var key = _this.biz.keyField
      var arr = new Array()

      if (AItem) {
        arr.push(AItem[key])
      } else {
        if (_this.selection.ids.length == 0) {
          DEUI.showBootoast({
            message: '未选中需要操作的数据'
          })
        }
        arr.copy(_this.selection.ids)
      }

      var data = {
        ids: arr.join(',')
      }
      _this.biz.fillCallParam(ADef, data)

      // 调用服务器操作
      _this.biz.callServer(data, function (bizdata) {
        // 如果有后续操作，执行后续操作
        if (_this._opAfter(ADef)) {
          _this._doCallAction(_this._opAfter(ADef), {})
        }

        if (ADef.onSuccess) {
          ADef.onSuccess(bizdata, ADef)
        }

        // 统一外部注入回调
        _this._callback(ADef, bizdata)

        DE.UI.Oper.showPopAlert(null, {
          text: ADef.opName + '已完成，本次操作 ' + arr.length + ' 条数据'
        })
      }, function (_data) {
        ADef.processing = false

        if (ADef.onFailer) {
          ADef.onFailer(_data, ADef)
        }
      }, ADef.opShowLoading)
    }
  },

  // 处理重置动作
  _bizDoReset: function (ADef) {
    // 重置查询条件
    for (var key in this.ui.cond) {
      if (this.ui.cond[key].bind) {
        var bind = this.ui.cond[key].bind
        this.data.cond[bind] = this.ui.cond[key].defValue
      } else {
        this.data.cond[key] = this.ui.cond[key].defValue
      }
    }
    // 重置分页条件
    if (this.page) {
      this.page.control.currPage = 0
    }

    // 重置选择
    this.selection.ids.clear()

    if (this._opAfter(ADef)) {
      this._doCallAction(this._opAfter(ADef), {})
    } else {
      this._doCallAction(this.biz.queryCode, {})
    }
  },

  // 处理更新操作
  _bizDoUpdate: function (ADef, AItem) {
    var _this = this

    // 首先提取
    var obj = {
      selID: AItem[this.biz.keyField]
    }
    this.biz.fillCallParam(ADef, obj)
    obj.opCode = ADef.opCodeGet

    this._bizDoGet(obj, function (bizdata) {
      _this.data.fields = bizdata.Object

      _this._bizDealItem(ADef, bizdata.Object)

      if (ADef.opForm) {
        var bizForm = DE.UI.Oper.showPopBlock($(ADef.opForm), {
          model: ADef.opFormDirect ? ADef.opFormDirect : 'TOP',
          ole: _this.Vue.el,
          clickClose: false
        })
        _this.ui.bizForm = bizForm
        _this.ui.bizForm.def = ADef
        ADef.bizForm = bizForm
      }
    }, ADef)
  },

  // 显示对象
  _bizDoShow: function (ADef, AItem) {
    var _this = this

    if (AItem == null) {
      this.ui.current = null
      return
    }

    // 首先提取
    var obj = {
      selID: AItem[this.biz.keyField]
    }
    this.biz.fillCallParam(ADef, obj)
    obj.opCode = ADef.opCodeGet

    this._bizDoGet(obj, function (bizdata) {
      _this._bizDealItem(ADef, bizdata.Object)

      _this.ui.current = bizdata.Object

      if (ADef.opForm) {
        _this.ui.bizForm = DE.UI.Oper.showPopBlock($(ADef.opForm), {
          model: ADef.opFormDirect ? ADef.opFormDirect : 'TOP',
          ole: _this.Vue.el,
          clickClose: false
        })
        _this.ui.bizForm.def = ADef
        ADef.bizForm = _this.ui.bizForm
      }

      if (ADef.onSuccess) {
        ADef.onSuccess(bizdata, ADef)
      }
    }, ADef)
  },

  // 选择对象
  _bizDoSelect: function (ADef, ACondObj) {
    var _this = this

    _this.callQuery(ADef.opCodeQuery)
    if (ADef.opForm) {
      _this.ui.bizForm = DE.UI.Oper.showPopBlock($(ADef.opForm), {
        model: ADef.opFormDirect ? ADef.opFormDirect : 'TOP',
        ole: _this.Vue.el,
        clickClose: false
      })
      _this.ui.bizForm.def = ADef
      ADef.bizForm = _this.ui.bizForm
    }
  },

  // 处理提取对象
  _bizDoGet: function (ACond, ACallBack, ADef) {
    this.biz.callServer(ACond, function (bizdata) {
      ACallBack(bizdata)
      if (ADef && ADef.onGetData) {
        ADef.onGetData(bizdata, ADef)
      }
    }, ADef.opShowLoading)
  },

  // 处理保存
  _bizDoSave: function (AObj, ACallBack, ACallError, AShowLoading) {
    for (var key in AObj) {
      if (typeof AObj[key] === 'object') {
        // AObj[key] = JSON.stringify(AObj[key]);
      }
    }

    this.biz.callServer(AObj, ACallBack, ACallError, AShowLoading)
  },

  _bizDealItem: function (ACode, AData) {
  },

  // 绑定VUE事件
  callBindVUEOper: function (AVUE, ARootName, ARouter) {
    this.Vue = AVUE
    this.Router = ARouter
    var _this = this

    AVUE.$watch(ARootName + '.ui.current', function (newVal, oldVal) {
      _this.callConnect(_this.ui.current)
    })

    AVUE.$watch(ARootName + '.selection.current', function (newVal, oldVal) {
      _this.callConnect(_this.selection.current)
    })

    AVUE.$watch(ARootName + '.selection.selAll', function (newVal, oldVal) {
      for (var i = 0; i < _this.ui.rows.length; i++) {
        _this.ui.rows[i].sel = newVal
      }
      _this._bizDoSelChange()
    })
  },

  checkCurrForm: function (ACode) {
    var Arr = new Array()

    if (typeof ACode === 'string') {
      Arr.push(ACode)
    } else {
      Arr = ACode
    }

    if (this.ui.bizForm && this.ui.bizForm.def) {
      return Arr.indexOf(this.ui.bizForm.def.bizOpCode) > -1
    }
    return false
  }
})
