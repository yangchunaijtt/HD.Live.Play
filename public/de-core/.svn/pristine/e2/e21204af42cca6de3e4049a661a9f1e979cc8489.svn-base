// DE环境中基础的实例工具
DE.define('DE.Instance', {
  singleton: true,

  obj_idx: 0,

  newIndex: function () {
    this.obj_idx++
    return this.obj_idx
  },

  newCtlID: function () {
    var idx = this.newIndex()
    return 'ctl-' + idx
  },

  newEnvID: function () {
    var idx = this.newIndex()
    return 'hd-env-' + idx
  },

  EnvList: new Array(),

  setEnv: function (id, env) {
    this.EnvList[id] = env
  },

  getEnv: function (id) {
    return this.EnvList[id]
  }

})
