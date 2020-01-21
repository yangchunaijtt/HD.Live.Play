
DE.define('DE.Oper.Simple.Root', {
  extend: 'DE.Oper.Root',

  config: {
    // 是否多选
    multSel: false
  },

  // 构造函数
  constructor: function () {
    this.callParent()

    this.page = {
      control: {
        perPage: 10,
        currPage: 0,
        hidePerPage: false
      },
      show: {
        total: 0,
        perPage: 0,
        currPage: 0,
        pages: 0,
        start: 0,
        currRows: 0
      },
      cond: {
        start: 0,
        limit: 10
      },
      set: {
        currPage: 0,
        dealed: true
      },
      uiRaise: false
    }
  },

  // 外部调用新建
  callNew: function (ACode, AConfig, AItem) {
    ACode = ACode || 'New'
    this.data.fields = AItem || {}
    this._doCallAction(ACode, AItem, AConfig)
  },

  // 统一触发动作
  _doCallAction: function (ACode, AItem, AConfig) {
    this.callParent(arguments)

    var def = this.biz.getAction(ACode)

    if (AConfig) {
      DE.merge(def, AConfig)
    }

    switch (def.opModel) {
      case 'OP_QUERY':
        this._bizDoQuery(def, AItem)
        break
      case 'OP_NEW':
        this._bizDoNew(def, AItem)
        break
    }
  },

  // 处理新建操作
  _bizDoNew: function (ADef, AItem) {
    // this.ui.bizForm = DE.UI.Oper.showPopBlock($(ADef.opForm), {
    //     model: ADef.opFormDirect ? ADef.opFormDirect : "TOP",
    //     ole: this.Vue.el,
    //     clickClose: false
    // });
    // this.ui.bizForm.def = ADef;

    this.data.fields = AItem || {}

    this.fillConnect()
    this.fillInitValue()

    console.log(this.ui.action)
    // ADef.bizForm = this.ui.bizForm;
  },

  // 唤起查询
  _bizDoQuery: function (ADef, ACond) {
    var _this = this
    if (ADef == null) {
      ADef = this.biz.getAction(this.biz.queryCode)
    }

    if (!ADef) return

    var cond = ACond || {}

    // 填充父级对象传入数值
    this.fillConnect()
    this.fillInitCond()

    // 包裹基本通讯定义
    this.biz.fillCallParam(ADef, cond)

    // 包裹条件
    DE.merge(cond, this.data.cond)

    DE.merge(cond, this.page.cond)

    cond.sort = this.fillSort()

    // 处理Params
    this.biz.callServer(cond, function (bizdata) {
      // 清空数据列表
      _this.ui.rows.clear()
      _this.selection.selAll = false

      // 填充数据列表
      setTimeout(function () {
        _this.ui.rows.copy(bizdata.Page.data)

        for (var i = 0; i < _this.ui.rows.length; i++) {
          _this.ui.rows[i].sel = false
          _this._bizDealItem(ADef, _this.ui.rows[i])
        }

        _this._bizDoReSel()

        if (_this.selection.items.length == 0 && _this.ui.rows.length > 0) {
          _this.callToggleSel(_this.ui.rows[0])
        }

        _this._bizDoSelChange()

        _this.ui.current = null
      }, 1)

      if (ADef.onSuccess) {
        ADef.onSuccess(bizdata, ADef)
      }

      if (_this.ui.rows.length == 0) {
        _this.selection.current = null
      }

      if (ADef.opCallBack) {
        for (var i = 0; i < ADef.opCallBack.length; i++) {
          ADef.opCallBack[i](bizdata, ADef)
        }
      }

      // 统一外部注入回调
      _this._callback(ADef, bizdata)

      // 反写分页数据
      _this._dealVUEPageShow(_this.page, bizdata.Page)
    }, function (_data) {
      if (ADef.onFailer) {
        ADef.onFailer(_data, ADef)
      }
    })
  },

  // 绑定VUE事件
  callBindVUEOper: function (AVUE, ARootName) {
    this.callParent(arguments)
    this._bindVUEPageWatch(AVUE, ARootName)
  },

  // 绑定分页变化监控
  _bindVUEPageWatch: function (AVUE, ARootName) {
    var _this = this

    // 修改每页数量控制
    AVUE.$watch(ARootName + '.page.control.perPage', function (newVal, oldVal) {
      var _currPage = parseInt((newVal == oldVal) ? newVal : 0)
      var _perPage = parseInt(newVal)
      // 修改查询控制
      _this.page.cond.start = _currPage * _perPage
      _this.page.cond.limit = _perPage
      _this.callQuery(null, { keepPage: true })
    })

    // 修改页码控制
    AVUE.$watch(ARootName + '.page.control.currPage', function (newVal, oldVal) {
      var _currPage = parseInt(newVal)
      var _perPage = parseInt(_this.page.control.perPage)
      // 修改查询控制
      _this.page.cond.start = _currPage * _perPage
      _this.page.cond.limit = _perPage
      _this.callQuery(null, { keepPage: true })
    })
  },

  // 回写分页数据变化
  _dealVUEPageShow: function (APage, AData) {
    APage.show.perPage = parseInt(APage.control.perPage)
    APage.show.currPage = parseInt(AData.start / AData.perPage)
    APage.show.pages = parseInt(AData.rows / AData.perPage) + ((AData.rows % AData.perPage > 0) ? 1 : 0)

    APage.show.total = AData.rows
    APage.show.start = AData.start
    APage.show.currRows = AData.data.length
  }

})
