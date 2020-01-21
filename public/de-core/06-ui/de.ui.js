// 界面相关操作

DE.define('DE.UI.Oper', {

  singleton: true,
  zindex: 800,

  showBootoast: function (config) {
    console.log(this.Toast)
    config = (typeof config === 'string' ? { message: config } : config)
    this.Toast(config)
  }

})

var DEUI = DE.UI.Oper
