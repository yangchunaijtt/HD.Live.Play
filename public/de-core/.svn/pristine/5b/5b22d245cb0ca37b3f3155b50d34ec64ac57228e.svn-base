// 微信相关操作封装
DE.define('DE.WX', {
  singleton: true,

  menuItems: [
    'menuItem:share:timeline',
    'menuItem:copyUrl',
    'menuItem:share:appMessage',
    'menuItem:share:qq',
    'menuItem:share:weiboApp',
    'menuItem:share:facebook',
    'menuItem:share:QZone',
    'menuItem:editTag',
    'menuItem:delete',
    'menuItem:copyUrl',
    'menuItem:originPage',
    'menuItem:readMode',
    'menuItem:openWithQQBrowser',
    'menuItem:openWithSafari',
    'menuItem:share:email',
    'menuItem:share:brand'
  ],

  shareMenus: {
    onMenuShareTimeline: 'menuItem:share:timeline',
    onMenuShareAppMessage: 'menuItem:share:appMessage',
    onMenuShareQQ: 'menuItem:share:qq',
    onMenuShareWeibo: 'menuItem:share:weiboApp',
    onMenuShareQZone: 'menuItem:share:QZone'
  },

  shares: new Array(),

  addShare: function (AParam) {
    AParam = typeof AParam === 'string' ? { key: AParam } : AParam
    this.shares.push(AParam)

    // 从要隐藏的菜单中删除该类型分享
    var index = this.menuItems.indexOf(this.shareMenus[AParam.key])
    if (index >= 0) {
      this.menuItems.splice(index, 1)
    }
  },

  apis: new Array(),

  addApi: function (AParam) {
    AParam = typeof AParam === 'string' ? { key: AParam } : AParam
    this.apis.push(AParam)
  },

  applySetting: function (AStick, AShare) {
    var _this = this

    for (var i = 0; i < AShare.showMenu.length; i++) {
      var index = this.menuItems.indexOf(AShare.showMenu[i])
      if (index >= 0) {
        this.menuItems.splice(index, 1)
      }
    }

    var arrApi = new Array()
    arrApi.push('hideMenuItems')

    for (var i = 0; i < this.apis.length; i++) {
      arrApi.push(this.apis[i].key)
    }

    for (var i = 0; i < this.shares.length; i++) {
      arrApi.push(this.shares[i].key)
    }

    AStick.debug = false
    AStick.jsApiList = arrApi

    wx.config(AStick)

    wx.ready(function () {
      wx.hideMenuItems({
        menuList: _this.menuItems
      })

      for (var i = 0; i < _this.shares.length; i++) {
        var share = _this.shares[i]
        var shareconfig = {}
        DE.apply(shareconfig, AShare)

        // 如果分享到朋友圈，使用特定分享信息，如果未设置特定分享信息，使用描述作为朋友圈分享信息
        if (share.key == 'onMenuShareTimeline') {
          shareconfig.title = shareconfig.tltitle ? shareconfig.tltitle : shareconfig.desc
        }

        shareconfig.success = function () {
          if (shareconfig.integralCode) {
            DE.Tools.dealShareIntegral(share.key, shareconfig.integralCode)
          }

          if (AShare.success) {
            AShare.success(share.key)
          }
        }

        eval('wx.' + share.key + '(shareconfig)')
      }
    })
  },

  // 服务器端远程下载图片文件
  downloadWXImage: function (ACond, callok) {
    $.ajax({
      // detodo
      type: 'post',
      url: ABC.getUrl('/Ext/Tools/DownloadWXImg'),
      data: ACond,
      async: true,
      success: function (data) {
        if (data.Status == 1) {
          callok(data.BizData)
        } else {
        }
      }
    })
  },

  showImages: function (list, idx) {
    var srcs = new Array()

    for (var i = 0; i < list.length; i++) {
      srcs.push(list[i].Normal)
    }

    var thisimg = list[idx].Normal

    wx.ready(function () {
      wx.previewImage({
        current: thisimg, // 当前显示图片的http链接
        urls: srcs // 需要预览的图片http链接列表
      })
    })
  }

})
