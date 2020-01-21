DE.define('DE.Sch.SchLessonLiveAPI.Api', {
  extend: 'DE.Api.Root',

  // 基本参数，链接服务器相关定义
  baseParam: {
    nameSpace: 'App.School.API',
    bizName: 'SchLessonLive',
    bizPkg: 'AppSchool'
  },

  keyField: 'sID',

  constructor: function () {
    this.callParent()

    this.addAction('CallStartLive', {
      opModel: 'OP_CALL_SERVER', opCode: 'DeCallStartLive', opName: '开始直播', opShowLoading: true
    })

    this.addAction('callTeacherJoinLive', {
      opModel: 'OP_CALL_SERVER', opCode: 'DeTeacherJoinLive', opName: '教师加入直播', opShowLoading: true
    })

    this.addAction('callStudentJoinLive', {
      opModel: 'OP_CALL_SERVER', opCode: 'DeStudentJoinLive', opName: '学员加入直播', opShowLoading: true
    })
  }
})

DE.define('DE.Sch.SchLessonLiveAPI.Caller', {

  extend: 'DE.Oper.Simple.Root',

  // 配置
  _config: {
    multSel: true
  },

  constructor: function () {
    this.callParent()
    this.initCond()
    this.initField()
    this.biz = new DE.Sch.SchLessonLiveAPI.Api()

    DE.merge(this.config, this._config)
  },

  initCond: function () {
  },

  initField: function () {
  },

  callStartLive: function (ALessonID) {
    var _this = this

    return new DE.Promise(function (resolve, reject) {
      _this.callAction('CallStartLive', {
        LessonID: ALessonID
      }, {
        onSuccess: function (bizdata, def) {
          resolve(bizdata.MsgData)
        }
      })
    })
  },

  callTeacherJoin: function (ALessonID, AUserID) {
    var _this = this

    return new DE.Promise(function (resolve, reject) {
      _this.callAction('callTeacherJoinLive', {
        LessonID: ALessonID,
        TeacherID: AUserID
      }, {
        onSuccess: function (bizdata, def) {
          DE.Call.send2Native(bizdata.MsgData)
        }
      })
    })
  },

  callStudentJoin: function (ALessonID, AUserID) {
    var _this = this
    return new DE.Promise(function (resolve, reject) {
      _this.callAction('callStudentJoinLive', {
        LessonID: ALessonID,
        StudentID: AUserID
      }, {
        onSuccess: function (bizdata, def) {
          DE.Call.send2Native(bizdata.MsgData)
        }
      })
    })
  },

  callExitApp : function(){
    DE.Call.send2Native({
      MsgCode: 'WIN_CLOSE'
    })
  }




})
