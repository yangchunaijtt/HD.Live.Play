DE.define('DE.Sch.SchTeacher.Api', {
  extend: 'DE.Api.Root',

  // 基本参数，链接服务器相关定义
  baseParam: {
    nameSpace: 'App.School.API',
    bizName: 'SchTeacher',
    bizPkg: 'AppSchool'
  },

  keyField: 'sID',

  constructor: function () {
    this.callParent()

    this.addAction('GetByPhone', {
      opModel: 'OP_CALL_SERVER', opCode: 'DeListGetByPhone', opName: '获取学员身份', opShowLoading: true
    })

    this.addAction('GetLessonsByRange', {
      opModel: 'OP_CALL_SERVER', opCode: 'DeGetLessonsByRange', opName: '获取学员日期范围课时', opShowLoading: true
    })

    this.addAction('GetLessonsByDay', {
      opModel: 'OP_CALL_SERVER', opCode: 'DeGetLessonByDay', opName: '获取学员指定日期课时', opShowLoading: true
    })
  }
})

DE.define('DE.Sch.SchTeacher.Caller', {

  extend: 'DE.Oper.Simple.Root',

  // 配置
  _config: {
    multSel: true
  },

  constructor: function () {
    this.callParent()
    this.initCond()
    this.initField()
    this.biz = new DE.Sch.SchTeacher.Api()

    DE.merge(this.config, this._config)
  },

  initCond: function () {
  },

  initField: function () {
  },

  getTeachersByPhone: function (APhone) {
    var _this = this
    return new DE.Promise(function (resolve, reject) {
      _this.callAction('GetByPhone', {
        sPhone: APhone
      }, {
        onSuccess: function (bizdata, def) {
          resolve(bizdata.Teachers)
        }
      })
    })
  },

  getLessonsByRange: function (ABegin, AEnd, AIDs) {
    var _this = this
    return new DE.Promise(function (resolve, reject) {
      _this.callAction('GetLessonsByRange', {
        dtBegin: ABegin + ' 00:00:00',
        dtEnd: AEnd + ' 23:59:59',
        userID: AIDs
      }, {
        onSuccess: function (bizdata, def) {
          resolve(bizdata.Lessons)
        }
      })
    })
  },

  getLessonsByDay: function (ADay, AIDs) {
    var _this = this
    return new DE.Promise(function (resolve, reject) {
      _this.callAction('GetLessonsByDay', {
        dtBegin: ADay + ' 00:00:00',
        dtEnd: ADay + ' 23:59:59',
        userID: AIDs
      }, {
        onSuccess: function (bizdata, def) {
          resolve(bizdata.Lessons)
        }
      })
    })
  }

})
