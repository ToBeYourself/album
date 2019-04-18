//引入灯箱组件
var Slider = require('../../template/slider/slider.js');
var util = require("../../utils/util.js");
var scale=require('../../utils/scale.js')
var app=getApp();
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl:[],
    currentIndex: 0,
    currentCateId:0,
    prdList:[]
  },
imageLoad:function(e){
  var imageSize=scale.imageUtil(e);
  this.setData({
    imageWidth:imageSize.imageWidth,
    imageHeight:imageSize.imageHeight
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var slider = new Slider(this);
    var _openId=app.globalData.openId;
    util.wxRequest({
      url: util.getBannerUrl,
      method: "POST",
      data: { type: '-1', openId: _openId },
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res=>{
      /**    wx.showToast({
                      title: '正在加载...',
                      icon: 'loading',
                      mask: true,
                      duration: 10000
          
                    })*/
      var _typeList = [];
      var _indexList = [];
      for (var a in res.typeList) {

        _typeList.push(res.typeList[a].type_name);
        _indexList.push(res.typeList[a].type);
      }

      this.setData({
        bannerUrl: res.urlList,
        typeList: _typeList,
        indexList: _indexList

      })
    
      app.globalData.urlList = res;
      slider.initData(this.data.bannerUrl);
    })
      
  },
  cateClick:function(e){
    
    var _data = { type: e.currentTarget.dataset.index, openId: app.globalData.openId};

    util.wxRequest({
      url: util.getItemUrl,
      method: "POST",
      data: _data,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res=>{
      this.setData({
        prdList: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})