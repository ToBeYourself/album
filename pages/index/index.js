//index.js
//获取应用实例
const app = getApp()
var util=require('../../utils/util.js');
Page({
  data: {
    motto: '我的相册',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
   if(app.globalData.openId){
     
     wx.switchTab({
       url: '../home/home',
     })
   }else{
     // 登录 获取jscode
     util.wxLogin({}).then(res => {
      
       if (res) {
         // 发送 res.code 到后台换取 openId, sessionKey, unionId

         var url = util.getOpenIdUrl + '?openId=' + res;

         util.wxRequest({
           url: util.getOpenIdUrl + '?openId=' + res
         }).then(res => {
          
           app.globalData.openId = JSON.parse(res).openid;
           wx.switchTab({
             url: '../home/home',
           })
         })
        
       } else {
         logger.info("登录失败");
       }
     })
   }
    if (app.globalData.userInfo) {
      
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
       
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      
    }
   
  },
  getUserInfo: function(e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
