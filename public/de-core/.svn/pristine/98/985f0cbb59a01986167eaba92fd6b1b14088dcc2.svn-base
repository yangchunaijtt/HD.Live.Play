// 执行各种格式化方法
DE.define('DE.Tools.Format', {
  singleton: true,

  //* ***********************************************************
  // 序号格式化

  RomaCode: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx', 'xxi', 'xxii', 'xxiii', 'xxiv', 'xxv'],

  // 格式化序号
  formatCode: function (i, model) {
    model = (model) || 'ENG';
    switch (model) {
      case 'NO':
        return ''
      case 'ALABO':
        return i + 1
      case 'ROMA':
        return this.RomaCode[i]
      default:
        return String.fromCharCode(65 + i)
    }
  },

  // 格式化罗马序号
  formatCodeRoma: function (i) {
    return this.RomaCode[i]
  },

  // 从序号反向格式化到序号
  code2Index: function (s, model) {
    console.log(model)
    model = (model) || 'ENG';
    switch (model) {
      case 'ALABO':
        return parseInt(s) - 1
      case 'ROMA':
        return this.RomaCoDE.indexOf(s)
      case 'NO':
      case 'EMG':
        var idx = s.toUpperCase().charCodeAt()
        return idx - 65
      default:
        var idx = s.toUpperCase().charCodeAt()
        return idx - 65
    }
  },

  // 序号格式化
  //* ***********************************************************

  //* ***********************************************************
  //      HTML 相关格式化

  // html内容编码，进行相关转义
  htmlEncode: function (input) {
    var converter = document.createElement('DIV')
    converter.innerText = input
    var output = converter.innerHTML
    converter = null
    return output
  },

  // html内容解码，将相关转义转成html
  htmlDecode: function (input) {
    var converter = document.createElement('DIV')
    converter.innerHTML = input
    var output = converter.innerText
    converter = null
    return output
  },

  // 保存html到数据库之前进行转义
  html2DB: function (shtml) {
    return this.htmlEncode(shtml)
  },

  // 从数据库读取数据反写回时的方法
  db2Html: function (shtml) {
    return this.htmlDecode(shtml)
  },

  // 获取基于单词的<w>标签包裹，用于取词
  // 输入为html
  getWTagHtml: function (html) {
    var ole = $('<div/>')

    function dealNode (ahtml, anode) {
      for (var i = 0; i < ahtml.childNodes.length; i++) {
        var subh = ahtml.childNodes[i]

        if (subh.nodeName == '#text') {
          var sh = ''
          var arr = subh.wholeText.split(' ')
          for (var j = 0; j < arr.length; j++) {
            if ($.trim(arr[j]) != '') {
              sh += '<w>' + $.trim(arr[j]) + '</w>'
            } else {
              sh += '&nbsp;'
            }
          }
          anoDE.append(sh)
        } else {
          var subn = $(subh).clone()
          subn.html('')
          anoDE.append(subn)
          dealNode($(subh)[0], subn)
        }
      }
    }

    var html = $(html)
    for (var i = 0; i < html.length; i++) {
      if (html[i].nodeName != '#text') {
        var node = $(html[i]).clone()
        noDE.html('')
        ole.append(node)
        dealNode(html[i], node)
      }
    }

    return ole.html()
  },

  // 获取基于单词的<w>标签包裹，用于取词
  // 输入为文本
  getWTagText: function (txt) {
    var words = txt.split(' ')
    var out = ''
    for (var i = 0; i < words.length; i++) {
      words[i] = $.trim(words[i])
      if (words[i] != '') {
        out += '<w>' + words[i] + '</w>'
      }
    }
    return out
  },

  // html样式清洗
  formatStyle: function (view) {
    var cssClear = new Array('font-family', 'font-size', 'margin', 'white-space', 'line-height', 'text-indent', 'padding-left', 'font',
      'windows', 'font-style', 'text-align', 'orphans', 'widows', 'font-stretch', 'display', 'width', 'margin-top',
      'page-break-after', 'page-break-inside', 'clear')
    var cssAllow = new Array('text-decoration', 'font-weight', 'background-color', 'color', 'background')

    function getIndex (Arr, Item) {
      for (var i = 0; i < Arr.length; i++) {
        if (Arr[i] == Item) {
          return i
        }
      }
      return -1
    }

    function dealCss (_view) {
      for (var i = 0; i < _view.length; i++) {
        var _style = $(_view[i]).attr('style')
        var _newStyle = ''
        if (_style) {
          var _arr = _style.split(';')
          for (var j = 0; j < _arr.length; j++) {
            var _arrSub = _arr[j].split(':')
            if (_arrSub.length == 2) {
              var trim = $.trim(_arrSub[0].toLowerCase())
              if (getIndex(cssClear, trim) == -1) {
                if (getIndex(cssAllow, trim) == -1) {
                }
                _newStyle += _arrSub[0] + ':' + _arrSub[1] + ';'
              }
            }
          }
          if (_newStyle) {
            $(_view[i]).attr('style', _newStyle)
          } else {
            $(_view[i]).removeAttr('style')
          }
        }
      }
    }

    function dealImg (_view) {
      $(_view).find('img').each(function () {
        var src = $(this).attr('src')
        // detodo
        var sreplace = 'http://115.29.43.76:8090/DocTrans'
        src = src.replace(new RegExp(sreplace, 'gm'), '/DocTrans')
        $(this).attr('src', src)
      })
    }

    dealCss(view)
    dealCss(view.find('*'))
    dealImg(view)
  },

  // 文本转换为html,替换回车与空格
  strToHtml: function (string) {
    if (string) {
      string = string.replace(/\r\n/g, '<br>')
      string = string.replace(/\n/g, '<br>')
      string = string.replace(/ /g, '&nbsp; ')
    }

    return string
  },

  //      文件相关
  //* ***********************************************************
  getFileNameExt: function (AFile) {
    var iLast = AFile.lastIndexOf('.')
    var iLen = AFile.length
    return iLast > -1 ? AFile.substring(iLast, iLen) : ''
  }

})

var DETFormat = DE.Tools.Format
