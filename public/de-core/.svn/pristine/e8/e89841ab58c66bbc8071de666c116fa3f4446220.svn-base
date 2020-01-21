// 树形业务操作基类

DE.define('DE.Oper.Tree.Root', {
  extend: 'DE.Oper.Root',

  config: {
    // 是否多选
    multSel: false
  },

  // 构造函数
  constructor: function () {
    this.callParent()
  },

  callNewSub: function (AItem, ACode, AConfig) {
    ACode = ACode || 'NewSub'
    this._doCallAction(ACode, AItem, AConfig)
  },

  callNewRoot: function (AItem, ACode, AConfig) {
    ACode = ACode || 'NewRoot'
    this._doCallAction(ACode, AItem, AConfig)
  },

  callToggleSelect: function (AItem) {
    // 清除树的选中节点
    clearSelect(this.ui.tree.root)

    function clearSelect (ANode) {
      ANode.select = false
      for (var i = 0; i < ANode.Subs.length; i++) {
        clearSelect(ANode.Subs[i])
      }
    }

    AItem.select = true

    this.ui.current = AItem
  },

  callToggleOpen: function (AItem) {
    AItem.open = !AItem.open
  },

  // 统一触发动作
  _doCallAction: function (ACode, AItem, AConfig) {
    this.callParent(arguments)

    var def = this.biz.getAction(ACode)
    def.Oper = this

    if (AConfig) {
      DE.merge(def, AConfig)
    }

    switch (def.opModel) {
      case 'OP_QUERY':
        this._bizDoQuery(def)
        break
      case 'OP_QUERY_NODE':
        this._bizDoQuery(def, AItem)
        break
      case 'OP_NEWSUB':
        this._bizDoNewSub(def, AItem)
        break
      case 'OP_NEWROOT':
        this._bizDoNewRoot(def, AItem)
        break
    }
  },

  // 处理新建操作
  _bizDoNewSub: function (ADef, AItem) {
    this.data.fields = {}
    this.fillInitValue()
    this.data.fields[this.biz.PidField] = AItem[this.biz.keyField]

    this.ui.bizForm = DE.UI.Oper.showPopBlock($(ADef.opForm), {
      model: 'TOP',
      ole: this.Vue.el,
      clickClose: true
    })

    ADef.Item = AItem

    this.ui.bizForm.def = ADef
    ADef.bizForm = this.ui.bizForm
  },

  // 处理新建操作
  _bizDoNewRoot: function (ADef, AItem) {
    this.data.fields = {}

    this.fillInitValue()

    this.data.fields[this.biz.PidField] = this.ui.tree.root[this.biz.keyField]

    this.ui.bizForm = DE.UI.Oper.showPopBlock($(ADef.opForm), {
      model: 'TOP',
      ole: this.Vue.el,
      clickClose: true
    })

    ADef.Item = AItem

    this.ui.bizForm.def = ADef
    ADef.bizForm = this.ui.bizForm
  },

  // 唤起查询
  _bizDoQuery: function (ADef, AItem) {
    var _this = this
    if (ADef == null) {
      ADef = this.biz.getAction(this.biz.queryCode)
    }

    if (!ADef) return

    var cond = {}

    if (ADef.opModel == 'OP_QUERY_NODE') {
      if (AItem) {
        cond.node = AItem[this.biz.keyField]
        AItem.open = true
      }
    }

    // 填充父级对象传入数值
    this.fillConnect()
    this.fillInitCond()

    // 包裹基本通讯定义
    this.biz.fillCallParam(ADef, cond)

    // 包裹条件
    DE.merge(cond, this.data.cond)

    // 保存状态
    this._bizDoStatusSave(ADef.Oper)

    // 处理Params
    this.biz.callServer(cond, function (bizdata) {
      // 清空数据列表
      if (ADef.opModel == 'OP_QUERY_NODE') {
        AItem.Subs.copy(bizdata.Tree)
        // detodo 需要调用处理
        // _this._bizDealItem(ADef.bizOpCode, _this.ui.rows[i]);
      } else {
        _this.ui.tree.root.Subs = bizdata.Tree
      }

      if (ADef.onSuccess) {
        ADef.onSuccess(bizdata, ADef)
      }

      _this._bizDoStatusReset(ADef.Oper)

      _this.ui.current = null
    }, function (_data) {
      if (ADef.onFailer) {
        ADef.onFailer(_data, ADef)
      }
    })
  },

  _bizDoStatusSave: function (AOper) {
    var status = new Array()

    function setstatus (node) {
      for (var i = 0; i < node.Subs.length; i++) {
        var sub = node.Subs[i]
        var statue = {
          select: sub.select,
          open: sub.open,
          check: sub.check,
          id: sub[AOper.biz.keyField]
        }
        status.push(statue)
        setstatus(sub)
      }
    }

    setstatus(AOper.ui.tree.root)

    this.status.tree = status
  },

  _bizDoStatusReset: function (AOper) {
    function resetstatus (node) {
      for (var i = 0; i < node.Subs.length; i++) {
        var sub = node.Subs[i]
        var statue = AOper.status.tree.getItem(sub[AOper.biz.keyField], 'id')

        if (statue) {
          sub.select = statue.select
          sub.open = statue.open
          sub.check = statue.check
        }
        resetstatus(sub)
      }
    }

    if (AOper.status.tree) {
      resetstatus(AOper.ui.tree.root)
    }
  },

  // 绑定VUE事件
  callBindVUEOper: function (AVUE, ARootName) {
    this.callParent(arguments)
  }

})
